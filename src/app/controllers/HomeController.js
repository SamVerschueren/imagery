'use strict';

var ctrl = angular.module('app.controllers');

ctrl.controller('HomeController', ['$scope', '$state', function($scope, $state) {
    
    /**
     * Triggered when the user presses the upload button in the navigation bar.
     */
    $scope.upload = function() {
        // Navigate to the upload state
        $state.go('upload');
    };
}]);