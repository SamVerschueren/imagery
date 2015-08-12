'use strict';

/**
 * This controller forms the base controller for all the other controllers that want to have a
 * title, and optional right bar buttons. It offers methods for setting the title and adding actions 
 * to the titlebar.
 *
 * @author Sam Verschueren       <sam.verschueren@gmail.com>
 * @since  31 Jul. 2015
 */
var ctrl = angular.module('app.controllers');

ctrl.controller('TitleBarController', ['$scope', function TitleBarController($scope) {

    // private
    var _this = {
        onCreate: function() {
            // Clear everything
            $scope.clear();
        }
    };

    // public
    var data = $scope._data = {};

    /**
     * Sets the title of the titlebar.
     *
     * @param  String title  The title of the titlebar
     */
    $scope.setTitle = function(title) {
        data.title = title;
    };
    
    /**
     * Sets the sub title of the titlebar.
     *
     * @param  String subTitle  The sub title of the titlebar
     */
    $scope.setSubTitle = function(subTitle) {
        data.subTitle = subTitle;
    };

    /**
     * Sets the right bar button item.
     *
     * @param  Object item  The item to show on the right bar.
     */
    $scope.setRightBarButtonItem = function(item) {
        data.rightBarButtonItem = item;
    };

    /**
     * Clears the title and the action of the titlebar.
     */
    $scope.clear = function() {
        $scope.$parent.clear();
        
        data.title = undefined;
        data.subTitle = undefined;
        data.rightBarButtonItem = undefined;
    };

    // Call the onCreate method
    _this.onCreate();
}]);
