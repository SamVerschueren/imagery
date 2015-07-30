/// <reference path="../../../../typings/angularjs/angular.d.ts" />
'use strict';

var components = angular.module('app.components');

components.controller('ActionItemController', ['$scope', function($scope) {
    $scope.trigger = function() {
        
    };
}]).directive('actionItem', function() {
	return {
        restrict: 'E',
        scope: {
            icon: '@',
            text: '@'
        },
        templateUrl: 'app/components/actionitem/view.html',
        controller: 'ActionItemController'
    };
});