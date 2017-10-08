myApp.controller('authorizedCtrl', function ($scope, $http, $location, userService) {
    $scope.modalShow = false;
    $scope.authorized = function () {
        $http.post('../cgi/authorized.php', "user=" + $scope.user + "&password=" + $scope.password, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function (response) {
            if (response.data.status == "authorized") {
                userService.authorization(response.data.user);
                $location.path("/main");
            } else {
                $scope.modalShow = true;
            }
        });
    };
});