/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell

 * =========================================================================== */
'use strict';

mslApp

    .factory('Settings', function() {

        var LocalStorageConstants = {
            MY_APP_URL: 'http://www.mysportsleague.info/index.php/app_services',
            USER_NAV_APP: 'user_nav_app'
        };
        
        return {
            getUrl: function(){return LocalStorageConstants.MY_APP_URL;},
            userNavApp: function() {
                var platform_default = device.platform == 'iOS' ? 'Apple' : 'Google';
                return localStorage.getItem(LocalStorageConstants.USER_NAV_APP) === null ? platform_default : localStorage.getItem(LocalStorageConstants.USER_NAV_APP);
            },
            saveUserNavApp: function(value) {
                localStorage.setItem(LocalStorageConstants.USER_NAV_APP,value);
            }
        }
    });
