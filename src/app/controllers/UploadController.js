'use strict';

angular.module('app.controllers')
    .controller('UploadController', ['$scope', '$state', '$config', '$http', 'fileModel', 'S3', function UploadController($scope, $state, $config, $http, model, s3) {
        // private
        var _this = {
            onCreate: function() {
                if(!model.getFile()) {
                    // Go home, you're drunk!!!
                    $state.go('home');
                }
                
                // Set the title and the right bar button item
                $scope.setTitle('Foto toevoegen');
                $scope.setRightBarButtonItem({
                    title: 'Upload',
                    action: _this.upload
                });
            },
            upload: function() {
                // Set the description provided by the user
                model.setDescription($scope.description);
                
                // Start uploading the file and listen to progress changes
                model.upload(_this.onProgressChanged)
                    .then(function(result) {
                        // Upload was successfull, go home
                        $state.go('home');
                    })
                    .catch(function(err) {
                        // Something went wrong, handle the error
                        console.error(err);
                    });
            },
            onProgressChanged: function(progress) {
                // Make the progress public
                $scope.progress = progress;
            }
        };
        
        // public
        $scope.file = model.getFile();
        
        // Initialize the controller
        _this.onCreate();
    }]);