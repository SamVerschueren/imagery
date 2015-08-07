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
    $locationProvider.html5Mode(false);

    $stateProvider
        .state('default', {
            abstract: true,
            templateUrl: 'app/views/includes/default.html',
            controller: 'Controller'
        })
        .state('titlebar', {
            abstract: true,
            parent: 'default',
            templateUrl: 'app/views/includes/titlebar.html',
            controller: 'TitleBarController'
        })
        .state('home', {
            url: '/',
            templateUrl: 'app/views/home/index.html',
            controller: 'HomeController'
        })
        .state('upload', {
            url: '/upload',
            templateUrl: 'app/views/upload/index.html',
            parent: 'titlebar',
            controller: 'UploadController'
        })
        .state('user', {
            url: '/user',
            templateUrl: 'app/views/user/index.html',
            parent: 'titlebar',
            controller: 'UserController'
        });
}]);