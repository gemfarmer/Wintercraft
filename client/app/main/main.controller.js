'use strict';

angular.module('wintercraftApp')
  .controller('MainCtrl', function ($scope, $http, User) {
    $scope.awesomeThings = [];
    $scope.user = User.get();
    console.log($scope.user)
    // $http.get('/api/things').success(function(awesomeThings) {
    //   console.log('awesome things',JSON.parse(awesomeThings))

    //   $scope.awesomeThings = awesomeThings;
    // });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });
