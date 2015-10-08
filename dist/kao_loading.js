$traceurRuntime.ModuleStore.getAnonymousModule(function() {
  "use strict";
  angular.module("kao.loading", ["kao.utils"]).factory("LoadingTracker", function(KaoDefer) {
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
  }).service("LoadingTrackerService", function(LoadingTracker) {
    var trackers = {};
    return {get: function(name) {
        var tracker = trackers[name];
        if (!(typeof tracker !== "undefined" && tracker !== null)) {
          tracker = new LoadingTracker();
          trackers[name] = tracker;
        }
        return tracker;
      }};
  }).directive("spinner", function() {
    return {
      restrict: "E",
      replace: true,
      template: "<div class=\"spinner-loader\">Loading\uFFFD</div>"
    };
  }).directive("loadingDiv", function() {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      scope: {loading: "@"},
      controller: function($scope, LoadingTrackerService) {
        $scope.tracker = LoadingTrackerService.get($scope.loading);
      },
      template: "<div>     <div class=\"loading-container\" ng-if=\"tracker.isLoading\">         <spinner></spinner>     </div>     <ng-transclude ng-if=\"!tracker.isLoading\"></ng-transclude> </div>"
    };
  }).directive("loadingButton", function() {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      scope: {loading: "@"},
      controller: function($scope, $element, LoadingTrackerService) {
        $scope.tracker = LoadingTrackerService.get($scope.loading);
        $scope.$watch(function(scope) {
          return scope.tracker.isLoading;
        }, function(value) {
          if (value) {
            angular.element($element[0]).button("loading");
          } else {
            angular.element($element[0]).button("reset");
          }
        });
      },
      template: "<button><ng-transclude></ng-transclude></button>"
    };
  });
  return {};
});

//# sourceMappingURL=kao_loading.map
