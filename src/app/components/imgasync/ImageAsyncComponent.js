'use strict';

angular.module('app.components')
    .directive('imgAsync', ['$timeout', '$http', function($timeout, $http) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngSrc: '@'
            },
            templateUrl: 'app/components/imgasync/view.html',
            link: function(scope, element, attrs) {
                var el = angular.element(element),
                    image = el.find('img')[0];
    
                // Listen for when the image is loaded
                image.onload = function() {
                    scope.$apply(function() {
                        scope.loading = false;
                    });
                };
    
                scope.$watch('ngSrc', function(source) {
                    check(source);
                });
                
                function check(source, index) {
                    scope.loading = true;
                    
                    index = index || 0;
                    
                    $timeout(function() {
                        $http.get(source)
                            .then(function() {
                                image.src = source;
                            })
                            .catch(function(err) {                                
                                check(source, index+1);
                            });
                    }, index*300);
                }
            }
        };
    }]);