'use strict';

/**
 * This service is used to upload a file to the correct location. The caller doesn't have to know
 * where the file will be stored.
 * 
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  4 Aug. 2015
 */
angular.module('app.services')
    .factory('imageService', ['$http', '$config', function ImageService($http, $config) {
        return {
            /**
             * This method will store the metadata on the server.
             * 
             * @param  {String}     file            The path to the file.
             * @param  {String}     description     The description of the file
             * @return {Promise}                    The promise object.
             */
            save: function(file, description) {
                // Post the data to the API
                return $http.post($config.API_URI + '/selfie', {email: 'sam.verschueren@gmail.com', description: description, selfie: file});
            },
            /**
             * This method will retrieve all the selfies from the server.
             * 
             * @return {Promise}                    The promise object.
             */
            load: function() {
                // Load all the selfies
                return $http.get($config.API_URI + '/selfies');
            }
        };
    }]);