/// <reference path="../../../../typings/angularjs/angular.d.ts" />
'use strict';

/**
 * This component shows a progress bar.
 * 
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  1 Aug. 2015
 */

var components = angular.module('app.components');

components.directive('progressBar', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            value: '@'
        },
        templateUrl: 'app/components/progressbar/view.html'
    };
});