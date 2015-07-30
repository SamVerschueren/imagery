'use strict';

var ctrl = angular.module('app.controllers');

ctrl.controller('HomeController', ['$scope', '$state', 'fileModel', function($scope, $state, model) {
    
    /**
     * Triggered when the user presses the upload button in the navigation bar.
     */
    $scope.upload = function(file) {
        if(file && file.length) {
            // Set the file
            model.setFile(file[0]);
            
            // Navigate to the upload state
            $state.go('upload');
        }
    };
}]);