'use strict';

angular.module('wintercraftApp')
  .controller('PresetsCtrl', ['$scope', '$http', 'User', function ($scope, $http,User) {
    $scope.message = 'Hello';
    $scope.presets = {};

    $scope.submit = function(form) {
      $scope.submitted = true;

      if(form.$valid) {

        // console.log($scope.presets)
        // $scope.createPresets($scope.presets);
        // var presets = $scope.getPresets();
        // console.log(presets)
        // User.update(id, updatedUser,function(req,res){
        //   $scope.saveMessage = true;
        //   $timeout(function(){
        //     $scope.saveMessage = false;
        //   },2000);
        // });
        //
        console.log($scope.presets)
        $http.post('/api/preset', $scope.presets).success(function(presets) {
          console.log('presets',presets)
          var currentUser = User.get()
          console.log(currentUser)
        });

      }
    };

    $scope.createPresets = function(presets) {
      $http.post('/api/presets', presets);
    };

    $scope.getPresets = function(presets) {
      $http.get('/api/presets');
    };

  }]);

