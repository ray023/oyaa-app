/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * =========================================================================== */
'use strict';

mslApp

    .controller('ScheduleCtrl', function($scope, $ionicPopup, Schedule, Subscribe) {

        var success_callback = function(schedule){
            var teams = [];
            var team_identifier_array = [];
            angular.forEach(schedule, function(value) {
                if (team_identifier_array.indexOf(value.team_identifier) < 0) {
                    team_identifier_array.push(value.team_identifier);
                    this.push({
                        id: value.team_identifier,
                        team_description: value.team_description,
                        head_coach: value.head_coach
                    });
                }
            }, teams);

            $scope.data = {
                team_is_plural: teams.length > 1,
                team_id: teams.length > 1 ? false : teams[0].id,
                teams: teams,
                schedule: schedule
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

        if (Subscribe.getSubscribedTeamIds().length > 0)
        {
            Schedule.getSchedule().then(
                success_callback,
                error_callback);
        }
        else
        {
            $ionicPopup.alert({
                title: 'Subscribe!',
                template: 'You are not subscribed to any teams.  Click the Subscribe icon to get started.'
            });
        }

        $scope.refresh = function() {
            if (Subscribe.getSubscribedTeamIds().length > 0)
            {
                Schedule.getSchedule().then(
                    success_callback,
                    error_callback);
            }
            else
            {
                $ionicPopup.alert({
                    title: 'Subscribe!',
                    template: 'You are not subscribed to any teams.  Click the Subscribe icon to get started.'
                });
            }
            $scope.$broadcast('scroll.refreshComplete');
        };

    })

    .controller('ScheduleDetailCtrl', function($scope, $stateParams, Schedule) {

        $scope.data =
        {
            team_id: $stateParams.team_id,
            schedule: Schedule.getLocalSchedule()
        }
    });