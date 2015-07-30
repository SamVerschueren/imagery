'use strict';

var ctrl = angular.module('app.controllers');

ctrl.controller('UploadController', ['$scope', '$state', 'fileModel', function($scope, $state, model) {
    
    // private
    var _this = {
        onCreate: function() {
            if(!$scope.file) {
                $state.go('home');
            }
        }
    };
    
    // public
    $scope.file = model.getFile();
    
    // Initialize the controller
    _this.onCreate();
}]);