/// <reference path="../../../../typings/angularjs/angular.d.ts" />
'use strict';

var components = angular.module('app.components');

components.controller('ActionbarController', [function() {

}]).directive('actionbar', function() {
	return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'app/components/actionbar/view.html',
        controller: 'ActionbarController'
    };
});