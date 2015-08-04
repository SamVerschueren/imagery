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
                
            // Specify the load options
            var options = {
                maxWidth: el[0].offsetWidth,
                maxHeight: 200,
                crop: true,
                canvas: true
            };
            
            // Load the image data
            window.loadImage.parseMetaData(img, function(data) {
                if(data.imageHead && data.exif) {
                    // If we have exif date, use the orientation property to orient correctly
                    options.orientation = data.exif.get('Orientation');
                }
                
                // Load the image in the correct orientation
                window.loadImage(img, function(canvas) {                    
                    scope.$apply(function() {
                        // Append the canvas to the dom.
                        el.append(canvas);
                    });
                }, options);
            });
        }
    };
});