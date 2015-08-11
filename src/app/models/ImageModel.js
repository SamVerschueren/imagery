'use strict';

// Expose the model
angular.module('app.models')
    .factory('imageModel', ['$config', 'imageService', function ImageModel($config, imageService) {
        var _this = {
            images: []
        };
        
        return {
            getImages: function() {
                return _this.images;
            },
            loadImages: function() {
                imageService.load()
                    .then(function(result) {
                        _this.images = _this.images.concat(result);
                    })
            }
        };
    }]);