myApp.controller('motorsCtrl', function ($scope, $http) {

    $http.get("../cgi/getAllObjects.php").then(function (response) {
        createObjectTree(response.data);
    }, function (response) {
        alert(response.statusText + " " + response.data);
    });

    $scope.$watch('objectsTree.currentNode', function (newObj, oldObj) {
        if ($scope.objectsTree && angular.isObject($scope.objectsTree.currentNode) && !$scope.objectsTree.currentNode.children.length) {
            $http.get("../cgi/getMotorsByIdObject.php", {
                params: {
                    idObject: $scope.objectsTree.currentNode.id
                }
            }).then(function (response) {
                $scope.motorsInObject = response.data;
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

});