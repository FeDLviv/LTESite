myApp.controller('mainCtrl', function ($scope, $http, $location, userService) {
    $scope.logout = function () {
        $http.get("../cgi/logout.php").then(function (response) {
            if (response.data) {
                userService.logout();
                $location.path("/authorized");
            }
        });
    };

    $scope.isShow = function () {
        return $location.path() !== '/authorized';
    }

    $scope.menu = [{
        "title": "Об'єкти",
        "path": "/objects"
    }, {
        "title": "Двигуни",
        "path": "/motors"
    }, {
        "title": "Лічильники",
        "path": "/meters"
    }, {
        "title": "ТС",
        "path": "/tc"
    }, {
        "title": "Субабоненти",
        "path": "/subabonents"
    }, {
        "title": "ТП",
        "path": "/ts"
    }, {
        "title": "Wilo",
        "path": "/wilo"
    }];

    $scope.isActiveItem = function (path) {
        return ($location.path() === path) ? 'active-menu' : '';
    }

});