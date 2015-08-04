'use strict';

var controllers = angular.module('app.controllers', []);

controllers.controller('Controller', ['$scope', function Controller($scope) {

    // public
    var data = $scope._data = {
        loading: false
    };

    /**
     * Sets the loading state of the view.
     *
     * @param {Boolean}     loading     Boolean indicating if we should show the loader or not.
     */
    $scope.loading = function(loading) {
        data.loading = loading;
    };
}]);