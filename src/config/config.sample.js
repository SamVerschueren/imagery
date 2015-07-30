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
    API_URI: 'https://id.execute-api.eu-west-1.amazonaws.com/production',
    API_KEY: 'my-api-key',
    BUCKET_NAME: 'my-bucket-name',
    COGNITO_POOL_ID: 'eu-west-1:ID',
    AWS_REGION: 'eu-west-1'
});
