'use strict';

/**
 * This service is used to upload a file to the correct location. The caller doesn't have to know
 * where the file will be stored.
 * 
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  4 Aug. 2015
 */
angular.module('app.services')
    .factory('imageService', ['$http', '$config', 'userModel', function ImageService($http, $config, user) {
        return {
            /**
             * This method will store the metadata on the server.
             * 
             * @param  {String}     file            The file name.
             * @param  {String}     description     The description of the file
             * @return {Promise}                    The promise object.
             */
            save: function(file, description) {
                // Define the body
                var body = {
                    id: user.getID(),
                    name: user.getName(),
                    email: user.getMail(),
                    description: description,
                    image: file,
                    date: moment().format()
                };
                
                // Post the data to the API
                return $http.post($config.API_URI + '/selfie', body)
                    .then(function(result) {
                        return result.data;
                    });
            },
            /**
             * This method will retrieve all the selfies from the server.
             * 
             * @return {Promise}                    The promise object.
             */
            load: function(image) {
                var qs = '';
                
                if(image) {
                    qs = '?since=' + encodeURIComponent(image.date);
                }
                
                // Load all the selfies
                return $http.get($config.API_URI + '/selfies' + qs)
                    .then(function(result) {
                        return result.data;
                    });
            }
        };
    }]);