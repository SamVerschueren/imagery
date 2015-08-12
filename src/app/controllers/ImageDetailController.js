'use strict';

angular.module('app.controllers')
    .controller('ImageDetailController', ['$scope', '$state', '$config', 'imageModel', function UploadController($scope, $state, $config, imageModel) {
        // private
        var _this = {
            onCreate: function() {
                // Make sure to reset the scope
                $scope.clear();
                
                if(!imageModel.getImage()) {
                    // Go home, you're drunk!!!
                    return $state.go('home');
                }
            }
        };
        
        // public
        $scope.image = imageModel.getImage();
        
        // Initialize the controller
        _this.onCreate();
    }]);