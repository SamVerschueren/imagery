/// <reference path="../../../../typings/angularjs/angular.d.ts" />
'use strict';

var components = angular.module('app.components');

components.controller('UploadController', ['$scope', '$config', '$http', 'Upload', function($scope, $config, $http, upload) {

    $scope.upload = function(file) {
        if(file && file.length) {
            file = file[0];
            
            $http.get($config.API_URI + '/s3policy', {headers: {'x-api-key': $config.API_KEY}})
                .then(function(response) {
                    var data = response.data;
                    
                    return upload.upload({
                        url: $config.BUCKET,
                        method: 'POST',
                        fields: {
                            key: data.key + '-' + file.name,
                            AWSAccessKeyId: $config.AWS_ACCESS_KEY_ID,
                            acl: 'private',
                            'Content-Type': file.type != '' ? file.type : 'application/octet-stream',
                            filename: data.key + '-' + file.name,
                            policy: data.policy,
                            signature: data.signature
                        },
                        file: file
                    }).progress(function(evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    });
                })
                .then(function(data) {
                    console.log(data);
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    };

}]).directive('upload', function() {
	return {
        restrict: 'E',
        templateUrl: 'app/components/upload/view.html',
        controller: 'UploadController'
    };
});