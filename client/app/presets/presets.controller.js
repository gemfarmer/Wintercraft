'use strict';

angular.module('wintercraftApp')
  .controller('PresetsCtrl', ['$scope', '$http', '$rootScope', 'User', function ($scope, $http, $rootScope, User) {
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
        console.log("scope presets: ",$scope.presets, $scope)
        $http.post('/api/preset', $scope.presets).success(function(presets) {
          console.log('presets',presets)
          console.log('currentUser: ', $rootScope.currentUser)
          // User.changePresets({ id: $rootScope.currentUser._id }, { presets:presets}, function(user) {
          //   console.log('user', user);
          //   // return cb(user);
          // }, function(err) {
          //   // return cb(err);
          //   console.log('err',err)
          // });
          // $http.put('/api/presets', presets)
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

