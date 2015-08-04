/// <reference path="../../../typings/angularjs/angular.d.ts" />
'use strict';

angular.module('ngAWS', [])
    .factory('AWS', [function() {
        return AWS;
    }])
    .factory('S3', ['AWS', function S3(AWS) {
        return new AWS.S3();
    }])