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
            
            console.log(model.getFile());
            
            var params = {
                Bucket: $config.BUCKET_NAME,
                Key: 'test.jpg',
                Body: file,
                ContentType: file.type
            };
            
            var upload = s3.upload(params, function(err, data) {
                if(err) {
                    console.error(err);
                    return;
                }
                
                console.log(data);
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