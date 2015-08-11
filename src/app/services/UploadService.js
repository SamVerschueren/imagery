'use strict';

/**
 * This service is used to upload a file to the correct location. The caller doesn't have to know
 * where the file will be stored.
 * 
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  4 Aug. 2015
 */
angular.module('app.services')
    .factory('uploadService', ['$rootScope', '$q', '$config', 'userModel', 'AWS', 'S3', function UploadService($rootScope, $q, $config, user, AWS, s3) {
        return {
            /**
             * This method will upload the file provided to the correct S3 location.
             * 
             * @param  {File}       file        The file that should be uploaded.
             * @param  {Function}   [notify]    The notify callback that will be called when the upload progress changes.
             * @return {Promise}                The promise object that will return the result.
             */
            upload: function(file, notify) {
                // Make a noop the default notify function
                notify = notify || function() {};
                
                // Return a promise
                return $q(function(resolve, reject) {
                    var dir = user.getID(),
                        ext = file.name.split('.').pop().toLowerCase(),
                        filename = new Date().valueOf() + '.' + ext;
                    
                    // Build up the params that will be used to uplaod the file
                    var params = {
                        Bucket: $config.BUCKET_NAME,
                        Key: 'raw/' + dir + '/' + filename,
                        Body: file,
                        ContentType: file.type
                    };
                    
                    // Start uploading and listen to the httpUploadProgress event
                    s3.upload(params, function(err, data) {
                        if(err) {
                            // If something went wrong, reject the request
                            return reject(err);
                        }
                        
                        // Resolve the data if everything went well
                        resolve(dir + '/' + filename);
                    }).on('httpUploadProgress', function(evt) {
                        // Calculate the percentage and notify the listener
                        $rootScope.$apply(function() {
                            notify(Number(evt.loaded / evt.total * 100).toFixed());
                        });
                    });
                });
            }
        };
    }]);