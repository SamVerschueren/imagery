'use strict';

angular.module('app.controllers')
    .controller('UserController', ['$scope', '$state', '$config', 'userModel', function UserController($scope, $state, $config, user) {
        // private
        var _this = {
            onCreate: function() {
                if(user.isValid()) {
                    // If the user is valid, go back to the upload page
                    return $state.go('upload');
                }
                
                // Set the title and the right bar button item
                $scope.setTitle('Informatie');
                $scope.setRightBarButtonItem({
                    title: 'Opslaan',
                    action: _this.save
                });
            },
            save: function() {
                
            }
        };
        
        // Initialize the controller
        _this.onCreate();
    }]);