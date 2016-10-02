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

    // Total Medicines Graph

    /* Simple GET request example:
    $http({
        method: 'GET',
        url: '/vendors/analytics/total'
    }).then(function successCallback(response) {
        $scope.labels = [];
        $scope.data = [];
        $scope.series = [];
        $scope.options = {
            scales: {
                yAxes: []
            }
        };
        $scope.datasetOverride = [];
        response.data.forEach(function(medicine) {
            $scope.labels.push(medicine.date);
            $scope.data.push(medicine.total);
            $scope.series.push(medicine.SKU);
            $scope.options.scales.yAxes.push({
                id: 'quantity-' + medicine.SKU,
                type: 'linear',
                display: true,
                position: 'left'
            });
            $scope.datasetOverride.push({
                yAxisID: 'quantity-' + medicine.SKU
            });
        });
        console.log($scope.labels);
        console.log($scope.data);
        console.log($scope.series);
    }, function errorCallback(response) {
        console.log('Got error: ', response);
    });*/

    $scope.onClick1 = function (points, evt) {
    console.log(points, evt);
    };

    $scope.labels1 = ["Sep. 30. 2016", "Sep. 30. 2016", "Sat, 01 Oct 2"];
    $scope.data1 = [
        [38, 0, 0],
        [4, 0, 0],
        [0, 5, 0]
    ];
    $scope.series1 = ["GU65", "NP66", "PY42"];

    //$scope.datasetOverride1 = [{ yAxisID: 'y-axis-1',yAxisID: 'y-axis-2',yAxisID: 'y-axis-3' }];
    $scope.options1 = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
          },
            {
              id: 'y-axis-2',
              type: 'linear',
              display: false,
              position: 'left'
          },
            {
              id: 'y-axis-3',
              type: 'linear',
              display: false,
              position: 'left'
            }
          ]
        }
    };

    // Total doctors Graph
    $http({
        method: 'GET',
        url: '/vendors/analytics/doctor'
    }).then(function successCallback(response) {
        $scope.labels2 = [];
        $scope.data2 = [];
        $scope.series2 = ['Total Orders'];
        response.data.forEach(function(doctor) {
            $scope.labels2.push(doctor.Name);
            $scope.data2.push(doctor.total);
        });
        console.log($scope.labels2);
    }, function errorCallback(response) {
        console.log('Got error: ', response);
    });

}]);
