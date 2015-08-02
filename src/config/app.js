'use strict';

/**
 * Application bootstrapping.
 *
 * @author Sam Verschueren       <sam.verschueren@gmail.com>
 * @since  21 Jul. 2015
 */
var app = angular.module('selfiewall', ['ngTouch', 'ngFileUpload', 'app.config', 'app.routes', 'app.services', 'app.models', 'app.components', 'app.controllers']);

app.run(['$config', function($config) {
    // Configure AWS
    AWS.config.region = $config.AWS_REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: $config.COGNITO_POOL_ID,
    });
    
    // Make sure we have an identity stored. This should be done in the initial screen
    // where the user fills in the username and email address.
    AWS.config.credentials.get();
}]);