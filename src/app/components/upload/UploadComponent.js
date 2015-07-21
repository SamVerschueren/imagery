/// <reference path="../../../../typings/angularjs/angular.d.ts" />
'use strict';

var components = angular.module('app.components');

components.controller('UploadController', ['$scope', function($scope) {

}]).directive('upload', function() {
	return {
        restrict: 'E',
        templateUrl: 'app/components/upload/view.html',
        controller: 'UploadController'
    };
});