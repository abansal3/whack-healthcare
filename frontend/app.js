// Module

var medrelay = angular.module('medrelay',['ngRoute','ngResource']);

 
medrelay.controller('mainController',['$scope', '$resource', function($scope,$resource) {

   $scope.data = $resource("url here", 
   {
     get: {
         method: "JSONP"
     }
   });

   $scope.dataresult = $scope.data.get({ /* json parsed */ });

}]);