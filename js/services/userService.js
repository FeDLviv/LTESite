myApp.factory('userService', function () {

    var user;
    var authorized = false;

    return {
        getUser: function () {
            return user;
        },
        isAuthorized: function () {
            return authorized;
        },
        authorization: function (name) {
            user = name;
            authorized = true;
        },
        logout: function() {
            user = undefined;
            authorized = false;
        }
    };

});