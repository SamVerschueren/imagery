'use strict';

angular.module('app.controllers')
    .controller('UploadController', ['$scope', '$state', '$config', '$http', 'fileModel', 'userModel', 'S3', function UploadController($scope, $state, $config, $http, model, user, s3) {
        var uploading = false;
        
        // private
        var _this = {
            onCreate: function() {
                // Make sure to reset the scope
                $scope.clear();
                
                if(!model.getFile()) {
                    // Go home, you're drunk!!!
                    return $state.go('home');
                }
                
                // Set the title and the right bar button item
                $scope.setTitle('Foto toevoegen');
                $scope.setRightBarButtonItem({
                    title: 'Upload',
                    action: _this.upload,
                    enabled: $scope.progress === undefined
                });
            },
            upload: function() {
                if(uploading) {
                    // This means we are already uploading
                    return;
                }
                
                // Set the uploading flag to true
                uploading = true;
                
                // Set the description provided by the user
                model.setDescription($scope.description);
                
                if(!user.isValid()) {
                    // Set the uploading flag back to false
                    uploading = false;
                    
                    // If the user is not valid, let him fill in the form first
                    return $state.go('user');
                }
                
                // Start uploading the file and listen to progress changes
                model.upload(_this.onProgressChanged)
                    .then(function(result) {
                        // Upload was successfull, reset the model first
                        model.reset();
                        
                        // Go home
                        $state.go('home');
                    })
                    .catch(function(err) {
                        uploading = false;
                        
                        // Something went wrong, handle the error
                        console.error(err);
                    });
            },
            onProgressChanged: function(progress) {
                // Make the progress public
                $scope.progress = progress;
                
                if(progress >= 100) {
                    // If the progress is 100%, the API is called to store the data in the database so we
                    // better show a loading indicator.
                    $scope.loading(true);
                }
            }
        };
        
        // public
        $scope.file = model.getFile();
        $scope.description = model.getDescription();
        
        // Initialize the controller
        _this.onCreate();
    }]);