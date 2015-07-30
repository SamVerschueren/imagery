'use strict';

/**
 * This file maps all the routes from angular to specific controllers.
 *
 * @author Sam Verschueren       <sam.verschueren@gmail.com>
 * @since  21 Jul. 2015
 */
var routes = angular.module('app.routes', ['ui.router']);

routes.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    
    // Enable the html5 mode
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/views/home/index.html',
            controller: 'HomeController'
        })
        .state('upload', {
            url: '/upload',
            templateUrl: 'app/views/upload/index.html',
            controller: 'UploadController'
        });
}]);