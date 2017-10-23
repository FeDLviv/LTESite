myApp.filter('nullFilter', function () {
    return function (str) {
        if (str === null) {
            return 'невідомо';
        } else {
            return str;
        }
    }
});