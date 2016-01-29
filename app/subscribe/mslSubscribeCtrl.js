/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * =========================================================================== */
'use strict';

mslApp
    .controller('SubscribeCtrl', function($scope, $ionicPopup, Subscribe) {
        $scope.SubscribeModel = Subscribe;

        var success_callback = function(teams){
            Subscribe.saveActiveTeamsToLocalStorage(teams);
            var association_seasons = [];
            var season_key_array = [];
            angular.forEach(teams, function(value) {
                var season_key = value.association_id + '_' + value.season_id;
                if (season_key_array.indexOf(season_key) < 0) {
                    season_key_array.push(season_key);
                    this.push({
                        id: season_key,
                        association_name: value.association_name,
                        season_name: value.season_name,
                        ionic_icon_name: value.ionic_icon_name,
                        css_style: value.css_style
                    });
                }
            }, association_seasons);
            $scope.data =
            {
                association_seasons: association_seasons,
                teams:  teams
            };
        };
        var error_callback = function(statusCode){
            var statusMessage = 'Server Error:  ' + statusCode;
            if (statusCode == '404')
                statusMessage = 'Could not connect to server.  Please make sure you have network connectivity.';

            $ionicPopup.alert({
                title: 'Server Error: ' + statusCode,
                okType: 'button-assertive',
                template: statusMessage
            });
        };

        Subscribe.getActiveTeamsFromServer().then(
            success_callback,
            error_callback
        );

        $scope.refresh = function() {
            Subscribe.getActiveTeamsFromServer().then(
                success_callback,
                error_callback
            );
            $scope.$broadcast('scroll.refreshComplete');
        };
    })

    .controller('SubscribeDetailCtrl', function($scope, $stateParams, Subscribe) {

        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };

        $scope.toggleSubscription = function(value) {
            if (value.checked)
                Subscribe.addSubscribedTeamId(value.team_id);
            else
                Subscribe.removeSubscribedTeamId(value.team_id);
        };

        var subscribed_teams_array = Subscribe.getSubscribedTeamIds();

        var isTeamSubscribed = function (id) { return subscribed_teams_array == null ? false : subscribed_teams_array.indexOf(id) >= 0;};

        var season_key = $stateParams.season_key.split('_');
        var association_id = season_key[0];
        var season_id = season_key[1];
        var all_active_teams = Subscribe.getActiveTeamsFromLocalStorage();

        var season_sport_groups = [];
        var sport_group_array = [];
        angular.forEach(all_active_teams, function(value) {
            if (value.association_id == association_id)
            {
                if (value.season_id == season_id)
                {
                    var team_object = {
                        team_id: value.team_id,
                        team_name: value.team_name,
                        checked: isTeamSubscribed(value.team_id)
                    };
                    if (sport_group_array.indexOf(value.sport_group_id) < 0) {
                        sport_group_array.push(value.sport_group_id);
                        this.push({
                            id: value.sport_group_id,
                            group_name: value.group_name,
                            teams: [team_object]
                        });
                    }
                    else
                    {
                        var sport_group_index = sport_group_array.indexOf(value.sport_group_id);
                        this[sport_group_index].teams.push(team_object);
                    }
                }
            }
        }, season_sport_groups);


        $scope.data =
            {   association_id: association_id,
                season_id: season_id,
                sport_groups: season_sport_groups
            }
    });