/// <reference path="../../typings/lodash/lodash.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
'use strict';

/**
 * Application bootstrapping.
 *
 * @author Sam Verschueren       <sam.verschueren@gmail.com>
 * @since  21 Jul. 2015
 */
var app = angular.module('selfiewall', ['app.routes', 'app.components', 'app.controllers']);