/// <reference path="../../../../typings/angularjs/angular.d.ts" />
'use strict';

/**
 * This component shows an image preview.
 * 
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  31 Jul. 2015
 */

var components = angular.module('app.components');

components.directive('imgPreview', function() {
	return {
        restrict: 'E',
        replace: true,
        scope: {
            imgSrc: '='
        },
        templateUrl: 'app/components/imgpreview/view.html',
        link: function(scope, el) {
            var img = scope.imgSrc;
            
            // Load the image data
            window.loadImage.parseMetaData(img, function(data) {
                if(!data.imageHead) {
                    return;
                }
                
                // Retrieve the orientation of the image
                var orientation = data.exif.get('Orientation');
                
                // Load the image in the correct orientation
                window.loadImage(img, function(canvas) {                    
                    scope.$apply(function() {
                        // Append the canvas to the dom.
                        el.append(canvas);
                    });
                }, {orientation: orientation, canvas: true});
            });
        }
    };
});