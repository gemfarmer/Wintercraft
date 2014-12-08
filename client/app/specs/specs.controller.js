'use strict';

angular.module('wintercraftApp')
  .controller('SpecsCtrl', ['$scope','$http',function ($scope, $http) {
    $scope.message = 'Hello';
    $scope.specs = {};


    $http.get('/api/weathers').success(function(weather) {
      console.log('awesome things',JSON.parse(weather))

      $scope.weather = weather;
    });
    $scope.submit = function(form) {
      $scope.submitted = true;

      if(form.$valid) {


        // User.update(id, updatedUser,function(req,res){
        //   $scope.saveMessage = true;
        //   $timeout(function(){
        //     $scope.saveMessage = false;
        //   },2000);
        // });

      }
    };
  }]);
