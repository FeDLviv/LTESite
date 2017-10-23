myApp.filter('phaseFilter', function () {
    return function (str) {
        if (str === null) {
            return 'невідомо';
        } else if (str === 0) {
            return '1~';
        } else {
            return '3~';
        }
    }
});