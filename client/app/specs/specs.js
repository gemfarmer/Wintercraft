'use strict';

angular.module('wintercraftApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('specs', {
        url: '/specs',
        templateUrl: 'app/specs/specs.html',
        controller: 'SpecsCtrl'
      });
  });