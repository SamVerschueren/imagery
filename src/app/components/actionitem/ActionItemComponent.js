/// <reference path="../../../../typings/angularjs/angular.d.ts" />
'use strict';

var components = angular.module('app.components');

components.directive('actionItem', function() {
    return {
        restrict: 'E',
        scope: {
            icon: '@',
            text: '@',
            trigger: '&'
        },
        templateUrl: 'app/components/actionitem/view.html'
    };
});