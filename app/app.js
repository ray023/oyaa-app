/* ===========================================================================
 * OYAA
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * Licensed under MIT
 * =========================================================================== */
'use strict';

var mslApp = angular.module('oyaaApp', ['ionic']);

mslApp.run(function($ionicPlatform) {
    //localStorage.clear();  //for testing UI defaults
    $ionicPlatform.ready(function() {

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.hide();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "app/shared/tabs.html"
        })

        .state('tab.news', {
            url: '/news',
            views: {
                'tab-news': {
                    templateUrl: 'app/news/tab-news.html',
                    controller: 'NewsCtrl'
                }
            }
        })

		.state('tab.schedule', {
            url: '/schedule',
            views: {
                'tab-schedule': {
                    templateUrl: 'app/schedule/tab-schedule.html',
                    controller: 'ScheduleCtrl'
                }
            }
        })

        .state('tab.schedule-detail', {
            url: '/schedule/:team_id',
            views: {
                'tab-schedule': {
                    templateUrl: 'app/schedule/mslScheduleDetail.html',
                    controller: 'ScheduleDetailCtrl'
                }
            }
        })

        .state('tab.subscribe', {
            url: '/subscribe',
            views: {
                'tab-subscribe': {
                    templateUrl: 'app/subscribe/tab-subscribe.html',
                    controller: 'SubscribeCtrl'
                }
            }
        })

        .state('tab.subscribe-detail', {
            url: '/subscribe/:season_key',
            views: {
                'tab-subscribe': {
                    templateUrl: 'app/subscribe/mslSubscribeDetail.html',
                    controller: 'SubscribeDetailCtrl'
                }
            }
        })

        .state('tab.settings', {
            url: '/settings',
            views: {
                'tab-settings': {
                    templateUrl: 'app/settings/tab-settings.html',
                    controller: 'SettingsCtrl'
                }
            }
        });

    //Fallback
    $urlRouterProvider.otherwise('/tab/news');

});