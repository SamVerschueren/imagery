'use strict';

// Expose the model
angular.module('app.models')
    .factory('userModel', ['$config', function UserModel($config) {
        return {
            isValid: function() {
                console.log(this.getName());
                console.log(this.getMail());
                
                return this.getName() && this.getMail();
            },
            getName: function() {
                return window.localStorage.getItem($config.STORAGE + '.name');
            },
            setName: function(name) {
                window.localStorage.setItem($config.STORAGE + '.name', name);
            },
            getMail: function() {
                return window.localStorage.getItem($config.STORAGE + '.email');
            },
            setMail: function(mail) {
                window.localStorage.setItem($config.STORAGE + '.mail', mail);
            }
        };
    }]);