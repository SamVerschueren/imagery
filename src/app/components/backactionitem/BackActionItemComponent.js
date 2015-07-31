/// <reference path="../../../../typings/angularjs/angular.d.ts" />
'use strict';

var components = angular.module('app.components');

components.directive('backActionItem', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/backactionitem/view.html',
        controller: ['$scope', function($scope) {
            $scope.back = function() {
                history.go(-1);
            };
        }]
    };
});