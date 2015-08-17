'use strict';

angular.module('app.controllers')
    .controller('HomeController', ['$scope', '$state', '$timeout', 'fileModel', 'imageModel', function HomeController($scope, $state, $timeout, fileModel, imageModel) {
    
        // private
        var _this = {
            onCreate: function() {
                // Make sure to reset the scope
                $scope.clear();
                
                if(imageModel.getImages().length === 0) {
                    $scope.loading(true);
                
                    imageModel.loadImages()
                        .finally(function() {
                            $scope.loading(false);
                            
                            $timeout(function() {
                                var raw = document.getElementById('home');
                                
                                if(raw.offsetHeight === raw.scrollHeight) {
                                    // If we don't have a scrollbar yet, load more
                                    $scope.loadMore();
                                }
                            });
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
                    .finally(function() {
                        $scope.loading(false);
                    });
            }
        };
        
        $scope.select = function(image) {
            imageModel.setImage(image);
            
            $state.go('detail');
        };
        
        // Initialize the controller
        _this.onCreate();
    }]);