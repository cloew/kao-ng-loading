module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        sass: {
            compile: {
                files: [{
                    expand: true,
                    src: ['*.scss'],
                    dest: 'dist/',
                    ext: '.css'
                }]
            }
        },
        concat: {
            options: {
                sourceMap: true,
            },
            distJs: {
              src: ['*.js'],
              dest: 'dist/kao_loading.js',
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'concat']);
};
function(a) {
a.module('kao.loading', ['kao.utils'])
    .factory('LoadingTracker', function(KaoDefer) {
        function LoadingTracker() {
            this.isLoading = false;
        }
        LoadingTracker.prototype.load = function(promise) {
            this.isLoading = true;
            var deferred = KaoDefer();
            var self = this;
            
            promise.success(deferred.resolve).error(deferred.reject);
            deferred.promise.finally(null).finally(function() {
                self.isLoading = false;
            });
            
            return deferred.promise;
        };
        return LoadingTracker;
    })
    .directive('spinner', function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="spinner-loader">Loading�</div>'
        };
    })
    .directive('loadingDiv', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                tracker: '='
            },
            template:  '<div>'+
                            '<div class="loading-container" ng-if="tracker.isLoading">' +
                                '<spinner></spinner>' +
                            '</div>' +
                            '<ng-transclude ng-if="!tracker.isLoading"></ng-transclude>' +
                        '</div>'
        };
    })
    .directive('loadingButton', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                tracker: '='
            },
            controller: function($scope, $element) {
                $scope.$watch(function(scope) {return scope.tracker.isLoading;},
                    function(value) {
                        if value {
                            angular.element($element[0]).button('loading');
                        } else {
                            angular.element($element[0]).button('reset');
                        }
                    }
                );
            },
            template: '<button><ng-transclude></ng-transclude></button>'
        };
    });
}(angular);
//# sourceMappingURL=kao_loading.js.map