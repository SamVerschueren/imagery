'use strict';

/**
 * This configuration file is used for all the configureable stuff in the application. This file
 * is used when running the application in development mode.
 *
 * @author Sam Verschueren       <sam.verschueren@gmail.com>
 * @since  24 Jul. 2015
 */
var config = angular.module('app.config', []);

config.constant('$config', {
    API_URI: '',
    API_KEY: '',
    AWS_ACCESS_KEY_ID: '',
    BUCKET: ''
});
