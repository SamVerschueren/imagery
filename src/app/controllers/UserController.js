'use strict';

angular.module('app.controllers')
    .controller('UserController', ['$scope', '$state', '$config', 'userModel', function UserController($scope, $state, $config, user) {
        // private
        var _this = {
            onCreate: function() {
                // Make sure to reset the scope
                $scope.clear();
                
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
                if($scope.frm.$valid === true) {
                    // Set the information of the user
                    user.setName($scope.name);
                    user.setMail($scope.mail);
                    
                    // Go back to the upload state
                    $state.go('upload');
                }
            }
        };
        
        // public
        $scope.name = user.getName();
        $scope.mail = user.getMail();
        
        // Initialize the controller
        _this.onCreate();
    }]);