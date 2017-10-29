myApp.directive('expander', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../templates/expander.html',
        scope: {
            title: '@'
        },
        transclude: true,
        link: function (scope, element, attrs) {
            scope.styleLoad = {
                height: 0
            }
            scope.show = false;
            scope.toggleEx = function () {
                scope.styleLoad = null;
                scope.show = !scope.show;
            };
        }
    };
});