'use strict';

angular.module('app.components')
    .directive('imgAsync', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngSrc: '@'
            },
            templateUrl: 'app/components/imgasync/view.html',
            link: function(scope, element, attrs) {
                var el = angular.element(element),
                    image = el.find('img')[0],
                    angularImage = angular.element(image),
                    index = 0;
    
                // Listen for when the image is loaded
                image.onload = function() {
                    scope.$apply(function() {
                        scope.loading = false;
                    });
                };
    
                scope.$watch('ngSrc', function(source) {
                    scope.loading = true;
                    
                    image.src = source;
                });
                
                angularImage.on('error', function() {
                    check();
                });
                
                function check() {
                    $timeout(function() {
                        image.src = scope.ngSrc;
                    }, (index++)*1000);
                }
            }
        };
    }]);