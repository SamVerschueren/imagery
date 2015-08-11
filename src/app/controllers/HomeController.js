'use strict';

angular.module('app.controllers')
    .controller('HomeController', ['$scope', '$state', 'fileModel', 'imageModel', function HomeController($scope, $state, fileModel, imageModel) {
    
        // private
        var _this = {
            onCreate: function() {
                if(imageModel.getImages().length === 0) {
                    $scope.loading(true);
                
                    imageModel.loadImages()
                        .then(function() {
                            $scope.loading(false);  
                        });
                }
            }
        };
    
        // public
        $scope.model = imageModel;
    
        /**
         * Triggered when the user presses the upload button in the navigation bar.
         */
        $scope.upload = function(file) {
            if(file && file.length) {
                // Set the file
                fileModel.setFile(file[0]);
                
                // Navigate to the upload state
                $state.go('upload');
            }
        };
        
        $scope.loadMore = function() {
            if(!$scope._data.loading) {
                $scope.loading(true);
                
                imageModel.loadMore()
                    .then(function() {
                        $scope.loading(false);
                    });
            }
        };
        
        // Initialize the controller
        _this.onCreate();
    }]);