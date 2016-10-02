// Module

var medrelay = angular.module('medrelay',['ngRoute']);

medrelay.config(function($routeProvider) {
    $routeProvider
        .when("/orders", {
            templateUrl : "templates/orders.html"
    });
    /*    .when("/red", {
            templateUrl : "red.htm"
    })
        .when("/green", {
            templateUrl : "green.htm"
    })
        .when("/blue", {
            templateUrl : "blue.htm"
    });*/
});

medrelay.controller('mainController',['$scope', '$http', '$location', function($scope,$http,$location) {

    $scope.orders_page = function () {
        $location.path('/orders');
    }

    $scope.analytics = function () {
        $location.path('/analytics');
    }

    // Simple GET request example:
    $http({
        method: 'GET',
        url: '/vendors/orders'
    }).then(function successCallback(response) {
        $scope.orders = [];
        response.data.forEach(function(order) {
            $scope.orders.push(order);
        });
        console.log($scope.orders);
        $scope.vendor_name = response.data[0].Vendor;
    }, function errorCallback(response) {
        console.log('Got error: ', response);
    });
}]);
