// Module

var medrelay = angular.module('medrelay',['ngResource']);

 
medrelay.controller('mainController',['$scope', '$http', function($scope,$http) {


  // Simple GET request example:
/*$http({
  method: 'GET',
  url: 'https://medrelay.herokuapp.com/data/'
}).then(function successCallback(response) {
  console.log('Got response: ', response);
    $scope.name = response.name;
  }, function errorCallback(response) {
  console.log('Got error: ', response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });*/
}]);