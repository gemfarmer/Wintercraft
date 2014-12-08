'use strict';

describe('Controller: PresetsCtrl', function () {

  // load the controller's module
  beforeEach(module('wintercraftApp'));

  var PresetsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PresetsCtrl = $controller('PresetsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
