var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/main', {
        templateUrl: 'templates/main.html',
        controller: 'mainCtrl'
    }).when('/authorized', {
        templateUrl: 'templates/authorized.html',
        /*controller: 'basketCtrl'*/
    });
    $routeProvider.otherwise({
        redirectTo: '/main'
    });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});