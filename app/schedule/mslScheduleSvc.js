/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * =========================================================================== */
'use strict';

mslApp
    .factory('Schedule', function ($http, $q, $ionicLoading, Settings, Subscribe) {
        var local_schedule;
        return {
            getSchedule: function () {
                var deferred = $q.defer();

                var subscribed_teams = Subscribe.getSubscribedTeamIds();

                if (subscribed_teams == null || subscribed_teams.length == 0){
                    console.log('WARNING:  not subscribed to any teams.');
                    return null;
                }

                $ionicLoading.show({template: 'Loading...'});
                $http({method: 'GET', url: Settings.getUrl() + '/game/get_schedule/' + subscribed_teams.join('/')}).
                    success(function (data, status, headers, config) {
                        $ionicLoading.hide();
                        local_schedule = data;
                        deferred.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        $ionicLoading.hide();
                        deferred.reject(status);
                    });

                return deferred.promise;
            },
            getLocalSchedule: function(){
                return local_schedule;
            }
        }
    });