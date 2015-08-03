'use strict';

/**
 * TODO
 * 
 * - Refactor using models and services
 * - Implement information screen when the user uses the upload for the first time
 */

var ctrl = angular.module('app.controllers');

ctrl.controller('UploadController', ['$scope', '$state', '$config', '$http', 'fileModel', 'S3Service', function($scope, $state, $config, $http, model, s3) {
    
    // private
    var _this = {
        onCreate: function() {
            if(!$scope.file) {
                $state.go('home');
            }
            
            $scope.setTitle('Foto toevoegen');
            $scope.setRightBarButtonItem({
                title: 'Upload',
                action: _this.upload
            });
        },
        upload: function() {
            var file = model.getFile();
            
            var dir,
                filename = new Date().valueOf(),
                ext = file.name.split('.').pop().toLowerCase();
            
            try {
                dir = AWS.config.credentials.identityId.split(':').pop().replace(/-/g, '');
            }
            catch(err) {
                dir = 'unknown';
            }
            
            var params = {
                Bucket: $config.BUCKET_NAME,
                Key: dir + '/' + filename + '.' + ext,
                Body: file,
                ContentType: file.type
            };
            
            var upload = s3.upload(params, function(err, data) {
                if(err) {
                    console.error(err);
                    return;
                }
                
                $http.post($config.API_URI + '/selfie', {email: 'sam.verschueren@gmail.com', description: $scope.description, selfie: params.Key})
                    .then(function() {
                        $state.go('home');
                    })
                    .catch(function(err) {
                        console.error(err);
                    })
            });
            
            upload.on('httpUploadProgress', function(evt) {
                $scope.$apply(function() {
                    $scope.progress = Number(evt.loaded / evt.total * 100).toFixed();
                });
            });
        }
    };
    
    // public
    $scope.file = model.getFile();
    
    // Initialize the controller
    _this.onCreate();
}]);