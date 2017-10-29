myApp.controller('objectsCtrl', function ($scope, $http) {

    $http.get("../cgi/objects.php").then(function (response) {
        createObjectTree(response.data);
    }, function (response) {
        alert(response.statusText + " " + response.data);
    });

    $scope.$watch('objectsTree.currentNode', function (newObj, oldObj) {
        if ($scope.objectsTree && angular.isObject($scope.objectsTree.currentNode) && !$scope.objectsTree.currentNode.children.length) {
            $http.get("../cgi/motors.php", {
                params: {
                    idObject: $scope.objectsTree.currentNode.id
                }
            }).then(function (response) {
                $scope.motorsInObject = response.data;
                if ($scope.motorsInObject.length) {
                    $scope.showNotData = false;
                } else {
                    $scope.showNotData = true;
                }
                $scope.showAddPanel = true;
            }, function (response) {
                alert(response.statusText + " " + response.data);
            });
            $scope.title = $scope.objectsTree.currentNode.label;
        }
    }, false);

    function createObjectTree(data) {
        $scope.objectsData = [];
        for (var i = 0; i < data.length; i++) {
            if (!$scope.objectsData.some(function (element, index, arr) {
                    return element.label === data[i].region;
                })) {
                //додавання не існуючого района
                $scope.objectsData.push({
                    "label": data[i].region,
                    "collapsed": true,
                    "children": [{
                        "collapsed": true,
                        "label": data[i].type,
                        "children": [{
                            "label": data[i].address,
                            "id": data[i].idObject,
                            "children": []
                        }]
                    }]
                });
            } else {
                //додавання не існуючого типу об'єкта до існуючого району
                var tempRegion = $scope.objectsData.filter(function (element, index, arr) {
                    return element.label === data[i].region && !element.children.some(function (element, index, arr) {
                        return element.label === data[i].type;
                    });
                });
                if (tempRegion.length) {
                    tempRegion[0].children.push({
                        "label": data[i].type,
                        "children": [{
                            "label": data[i].address,
                            "id": data[i].idObject,
                            "children": []
                        }],
                        "collapsed": true
                    });
                } else {
                    //додавання адреси до існуючого типу об'єкта та існуючого району
                    tempRegion = $scope.objectsData.filter(function (element, index, arr) {
                        return element.label === data[i].region;
                    });
                    temp = tempRegion[0].children.filter(function (element, index, arr) {
                        return element.label === data[i].type;
                    });
                    temp[0].children.push({
                        "label": data[i].address,
                        "id": data[i].idObject,
                        "children": []
                    });
                }
            }
        }
    }

    $scope.tableHeader = [{
        label: 'ID',
        value: 'idMotorsLTE'
    }, {
        label: 'ПРИЗНАЧЕННЯ',
        value: 'mission'
    }, {
        label: 'СЕРІЯ',
        value: 'series'
    }, {
        label: 'ТИП',
        value: 'type'
    }, {
        label: 'P(кВт)',
        value: 'power'
    }, {
        label: 'r/min',
        value: 'speed'
    }, {
        label: 'КІЛЬКІСТЬ ФАЗ',
        value: 'threePhase'
    }, {
        label: 'ІНВЕНТАРНИЙ НОМЕР',
        value: 'inventory'
    }, {
        label: 'ПІДШИПНИК (перед/низ)',
        value: 'bearing1'
    }, {
        label: 'ПІДШИПНИК (зад/верх)',
        value: 'bearing2'
    }, {
        label: 'ДОДАТКОВО',
        value: ''
    }, ];

    $scope.sortCol = 'mission';

    $scope.sort = function (nameColumn) {
        if ($scope.sortCol.charAt(0) == '-' && nameColumn == $scope.sortCol.substr(1)) {
            $scope.sortCol = '';
        } else {
            if ($scope.sortCol == nameColumn) {
                $scope.sortCol = '-' + $scope.sortCol;
            } else {
                $scope.sortCol = nameColumn;
            }
        }
    }

    $scope.headerStyle = function (nameColumn) {
        if ($scope.sortCol == nameColumn && nameColumn != '') {
            return {
                "color": "#5BC0DE"
            };
        } else if ($scope.sortCol.charAt(0) == '-' && nameColumn == $scope.sortCol.substr(1)) {
            return {
                "color": "#428BCA"
            };
        }
    }

    $scope.expand = function (motor) {
        if (!motor.expand) {
            $http.get("../cgi/motors.php", {
                params: {
                    idMotorHistory: motor.idMotorsLTE
                }
            }).then(function (response) {
                motor.motorHistory = response.data;
                return $http.get("../cgi/motors.php", {
                    params: {
                        idMotorRepair: motor.idMotorsLTE
                    }
                });
            }, function (response) {
                alert(response.statusText + " " + response.data);
            }).then(function (response) {
                motor.motorRepairs = response.data;
                motor.expand = true;
            }, function (response) {
                alert(response.statusText + " " + response.data);
            });
        } else {
            motor.expand = false;
        }
    }

    $scope.isShowTable = function () {
        if (angular.isUndefined($scope.motorsInObject)) {
            return false
        } else {
            return $scope.motorsInObject.length;
        }
    }

});