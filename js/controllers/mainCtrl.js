myApp.controller('mainCtrl', function($scope, $http, $location, userService){
    $scope.logout = function () {
        $http.get("../cgi/logout.php").then(function (response) {
            if (response.data) {
                userService.logout();
                $location.path("/authorized");
            }
        });
    };

    $scope.isShow = function() {
        return $location.path() !== '/authorized';
    }

});