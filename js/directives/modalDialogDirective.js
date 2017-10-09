myApp.directive('modalDialog', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../templates/modalDialog.html',
        scope: {
            show: '=',
            title: '@'
        },
        transclude: true,
        link: function (scope, element, attrs) {
            scope.dialogStyle = {};
            if (attrs.width) {
                scope.dialogStyle.width = attrs.width;
            }
            if (attrs.height) {
                scope.dialogStyle.height = attrs.height;
            }
            scope.hideDialog = function () {
                scope.show = false;
            };
        }
    };
});