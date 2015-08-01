'use strict';

// Expose the service
angular.module('app.services').factory('S3Service', [function S3Service() {
    return new AWS.S3();
}]);