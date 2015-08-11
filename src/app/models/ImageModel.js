'use strict';

// Expose the model
angular.module('app.models')
    .factory('imageModel', ['$q', '$config', 'imageService', function ImageModel($q, $config, imageService) {
        var _this = {
            images: [],
            blockMore: false
        };
        
        return {
            getImages: function() {
                return _this.images;
            },
            prepend: function(image) {
                // Add the image at the first position of the list
                _this.images.unshift(image);
            },
            loadImages: function() {
                if(_this.images.length > 0) {
                    // If we already have images, do not load them anymore
                    return $q.resolve(_this.images);
                }
                
                // Start loading the images
                return imageService.load()
                    .then(function(result) {
                        // Set the images
                        _this.images = result;
                        
                        // Return them
                        return _this.images;
                    })
            },
            loadMore: function() {
                if(_this.blockMore === true) {
                    // If the block more flag is set to true, just resolve the images we allready have
                    return $q.resolve(_this.images);
                }
                
                var last = _this.images[_this.images.length-1];
                
                // Start loading the images since the last image
                return imageService.load(last)
                    .then(function(result) {
                        if(result.length === 0) {
                            // If the server does not have more items, raise the flag
                            _this.blockMore = true;
                        }
                        else {
                            // Concat the items to the list of items
                            _this.images = _this.images.concat(result);
                        }
                        
                        // Return the images
                        return _this.images;
                    });
            }
        };
    }]);