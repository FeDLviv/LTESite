var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']); //'ui.grid'

myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/main', {
        resolve: {
            check: function ($location, userService) {
                if (!userService.isAuthorized()) {
                    $location.path("/authorized");
                }
            }
        },
        templateUrl: 'templates/main.html',
        controller: 'motorsCtrl'
    }).when('/authorized', {
        templateUrl: 'templates/authorized.html',
        controller: 'authorizedCtrl'
    });
    $routeProvider.otherwise({
        redirectTo: '/main'
    });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

myApp.run(function ($rootScope, $http, $location, $timeout, userService) {
    $http.get('../cgi/authorized.php').then(function (response) {
        if (response.data.status == "authorized") {
            userService.authorization(response.data.user);
            $location.path("/main");
        }
        $rootScope.hasCompleted = true;
    });
});