'use strict';

var ctrl = angular.module('app.controllers');

ctrl.controller('UploadController', ['$scope', '$state', '$config', 'fileModel', 'S3Service', function($scope, $state, $config, model, s3) {
    
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
            console.log('Start the upload');
            
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
                
                $state.go('home');
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