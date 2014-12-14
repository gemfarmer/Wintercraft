'use strict';

angular.module('wintercraftApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      // changeSettings:{
      //   method: 'PUT',
      //   params: {
      //     controller:'settings'
      //   }
      // },
      // changePresets:{
      //   method: 'PUT',
      //   params: {
      //     controller:'presets'
      //   }
      // },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
