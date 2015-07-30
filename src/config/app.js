'use strict';

/**
 * Application bootstrapping.
 *
 * @author Sam Verschueren       <sam.verschueren@gmail.com>
 * @since  21 Jul. 2015
 */
var app = angular.module('selfiewall', ['ngTouch', 'ngFileUpload', 'app.config', 'app.routes', 'app.components', 'app.controllers']);

app.run(['$config', function($config) {
    // Configure AWS
    AWS.config.region = $config.AWS_REGION;
}]);