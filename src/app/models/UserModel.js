'use strict';

// Expose the model
angular.module('app.models')
    .factory('userModel', ['$config', 'AWS', function UserModel($config, AWS) {
        return {
            isValid: function() {
                return this.getName() && this.getMail();
            },
            getID: function() {
                return AWS.config.credentials.identityId.split(':').pop();
            },
            getName: function() {
                return window.localStorage.getItem($config.STORAGE + '.name');
            },
            setName: function(name) {
                window.localStorage.setItem($config.STORAGE + '.name', name);
            },
            getMail: function() {
                return window.localStorage.getItem($config.STORAGE + '.mail');
            },
            setMail: function(mail) {
                window.localStorage.setItem($config.STORAGE + '.mail', mail);
            }
        };
    }]);