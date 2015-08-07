'use strict';

// Expose the service
angular.module('app.models').factory('fileModel', ['userModel', 'uploadService', 'imageService', function FileModel(userModel, uploadService, imageService) {
    return {
        setFile: function(file) {
            this._file = file;
        },
        getFile: function(file) {
            return this._file;
        },
        setDescription: function(description) {
            this._description = description;
        },
        getDescription: function() {
            return this._description;
        },
        upload: function(notify) {
            var description = this.getDescription();
            
            // Upload the file
            return uploadService.upload(this._file, notify)
                .then(function(file) {
                    // Save the image
                    return imageService.save(file, userModel.getMail(), userModel.getName(), description);
                });
        }
    };
}]);