'use strict';

angular.module('wintercraftApp')
  .controller('SpecsCtrl', ['$scope','$http',function ($scope, $http) {
    $scope.message = 'Hello';


    $scope.submit = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        console.log('form',$scope.specs)
        var settings = {
          sizing: {
            weight: $scope.specs.weight,
            diameter: $scope.specs.diameter,
            length: $scope.specs.strip
          },
          location: {
            zip: $scope.specs.zip
          }
        }
        // $http.post('/api/settings', settings).success(function(response){
        //   console.log('promise',response)

          // $http.get('/api/weathers', settings).success(function(weather) {
          //   console.log('awesome weather',JSON.parse(weather))

          //   $scope.weather = weather;
          // });


          $http.post('/api/weathers', settings).success(function(weather) {
            console.log('awesome weather',weather)
            $scope.timeToFreeze = weather.time;
            $scope.weather = weather;
          });

        // })



        // User.update(id, updatedUser,function(req,res){
        //   $scope.saveMessage = true;
        //   $timeout(function(){
        //     $scope.saveMessage = false;
        //   },2000);
        // });

      }
    };
  }]);
