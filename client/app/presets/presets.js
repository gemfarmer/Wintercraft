'use strict';

angular.module('wintercraftApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('presets', {
        url: '/presets',
        templateUrl: 'app/presets/presets.html',
        controller: 'PresetsCtrl'
      });
  });