'use strict';

/**
 * With the ng-infinite-scroll attribute, it is very easy to create an
 * infinite scroll page. The method attached to this attribute will be invoked
 * when the user hits the bottom of the screen. The controller can react to this
 * by loading more items.
 * 
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  11 Aug. 2015
 */
angular.module('app.components')
    .directive('infiniteScroll', function() {
        return {
            scope: {
                infiniteScroll: '&'
            },
            link: function(scope, element, attr) {
                var raw = element[0];
    
                element.bind('scroll', function() {
                    if(raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                        scope.$apply(scope.infiniteScroll);
                    }
                });
            }
        };
    });