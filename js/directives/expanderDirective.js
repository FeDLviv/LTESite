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
            scope.show = false;
            scope.toggleEx = function () {
                scope.show = !scope.show;
            };
        }
    };
});