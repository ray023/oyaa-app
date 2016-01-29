/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * =========================================================================== */
'use strict';

mslApp
    .factory('Subscribe', function($http, $q, $ionicLoading, Settings) {

        var LocalStorageConstants = {
            ACTIVE_TEAMS: 'active_teams',
            SUBSCRIBED_TEAMS: 'SUBSCRIBED_TEAMS'
        };

        return {
            getActiveTeamsFromServer: function() {
                var deferred  = $q.defer();

                $ionicLoading.show({template: 'Loading...'});
                $http({method: 'GET', url: Settings.getUrl() + '/team/get_active'}).
                    success(function(data,status,headers,config){
                        $ionicLoading.hide();
                        deferred.resolve(data);
                    }).
                    error(function(data,status,headers,config){
                        $ionicLoading.hide();
                        deferred.reject(status);
                    });

                return deferred.promise;
            },
            saveActiveTeamsToLocalStorage: function(value) {
                localStorage.setItem(LocalStorageConstants.ACTIVE_TEAMS,JSON.stringify(value));
            },
            getActiveTeamsFromLocalStorage: function() {
                return JSON.parse(localStorage.getItem(LocalStorageConstants.ACTIVE_TEAMS));
            },
            addSubscribedTeamId: function (team_id){
                var team_id_array = this.getSubscribedTeamIds();
                if (team_id_array == null || team_id_array.length == 0)
                    team_id_array = [team_id];
                else
                    team_id_array.push(team_id);

                localStorage.setItem(LocalStorageConstants.SUBSCRIBED_TEAMS,JSON.stringify(team_id_array));
                return true;
            },
            removeSubscribedTeamId: function (team_id){
                var team_id_array = this.getSubscribedTeamIds();
                if (team_id_array == null || team_id_array.length == 0 || team_id_array.indexOf(team_id) < 0)
                    console.log('WARNING:  team id not found' + team_id);
                else
                {
                    var splice_index = team_id_array.indexOf(team_id);
                    team_id_array.splice(splice_index,1);
                }
                localStorage.setItem(LocalStorageConstants.SUBSCRIBED_TEAMS,JSON.stringify(team_id_array));
                return true;
            },
            getSubscribedTeamIds: function (){
                var subscribed_teams = localStorage.getItem(LocalStorageConstants.SUBSCRIBED_TEAMS);
                return subscribed_teams == null ? '' : JSON.parse(localStorage.getItem(LocalStorageConstants.SUBSCRIBED_TEAMS));
            }
        }
    });