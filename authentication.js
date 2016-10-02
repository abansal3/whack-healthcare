// Module

var medrelay = angular.module('authentication_medrelay',[]);

medrelay.controller('mainController',['$scope', '$http', '$location', function($scope,$http,$location) {

$scope.vendor_name = "";
$scope.password = "";

$scope.submit = function () {
    // Simple GET request example:
    $http({
      method: 'POST',
      url: 'http://localhost:8080/login',
      data: {
          "vendor_name": $scope.vendor_name,
          "password": $scope.password
      }
    }).then(function successCallback(response) {
        //console.log(response);
        if (response.status == 200) {
            window.location.href = "/dashboard";
        }
      }, function errorCallback(response) {
        console.log('Got error: ', response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
}

}]);
