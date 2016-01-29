/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * =========================================================================== */
'use strict';

mslApp
    .factory('News', function($http, $q, $ionicLoading, Settings, Subscribe) {
        return {
            getNews: function () {
                var deferred = $q.defer();

                var subscribed_teams = Subscribe.getSubscribedTeamIds();

                if (subscribed_teams == null  || subscribed_teams.length == 0){
                    console.log('WARNING:  not subscribed to any teams.');
                    return;
                }

                $ionicLoading.show({template: 'Loading...'});
                console.log(subscribed_teams.join('/'));
                $http({method: 'GET', url: Settings.getUrl() + '/news/get_upcoming_games/' + subscribed_teams.join('/')}).
                    success(function (data, status, headers, config) {
                        $ionicLoading.hide();
                        deferred.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        $ionicLoading.hide();
                        deferred.reject(status);
                    });

                return deferred.promise;
            }
        }
    });