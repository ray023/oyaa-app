/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * =========================================================================== */
'use strict';

mslApp

    .controller('NewsCtrl', function($scope, $ionicPopup, News, Subscribe) {

        var success_callback = function(schedule){
            $scope.data = {
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
            News.getNews().then(
                success_callback,
                error_callback
            );
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
                News.getNews().then(
                    success_callback,
                    error_callback
                );
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

    });