// Module

var medrelay = angular.module('medrelay',['ngRoute','chart.js']);

/*
medrelay.config(function($routeProvider) {
    $routeProvider
        .when("/orders", {
            templateUrl : "templates/orders.html"
    })
        .when("/analytics", {
            templateUrl : "templates/analytics.html"
    });
});
*/

medrelay.controller('mainController',['$scope', '$http', '$location', function($scope,$http,$location) {

    $scope.orders_show = true;

    // Orders

    $scope.orders_page = function () {
        $scope.analytics_show = false;
        $scope.orders_show = true;
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
        $scope.vendor_name = response.data[0].Vendor;
    }, function errorCallback(response) {
        console.log('Got error: ', response);
    });

    // Analytics

    $scope.analytics = function () {
        $scope.orders_show = false;
        $scope.analytics_show = true;
    }

    $scope.labels = [];
    $scope.data = [];

    $scope.labels.push(order.date);
    $scope.data.push(order.quantity);
    $scope.series = ['Series A'];
    $scope.onClick = function (points, evt) {
    console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
    };

}]);
