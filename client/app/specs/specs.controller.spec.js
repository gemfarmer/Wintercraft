'use strict';

describe('Controller: SpecsCtrl', function () {

  // load the controller's module
  beforeEach(module('wintercraftApp'));

  var SpecsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpecsCtrl = $controller('SpecsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
