var App = require('./app');
var mockedDomUtil = require('./mocks/domUtil');
var mockedConvert = require('./mocks/convert');

describe('after app start', function() {

  function startApp() {
    var app = new App(mockedDomUtil, mockedConvert);
    app.start();
  }

  describe('rotate on scroll', function() {

    function fakeAScrollTo(degrees) {
      mockedDomUtil.onScroll.andCallFake(function(cb) { cb(degrees); });
      startApp();
    }

    it('when onScroll fires from the DOM it shall rotate', function() {
      var scrollOffset = 42;
      mockedConvert.scrollPositionToDegrees.andReturn(scrollOffset);

      fakeAScrollTo(scrollOffset);

      expect(mockedDomUtil.rotate).toHaveBeenCalledWith(scrollOffset);
    });
  });


  describe('rotate on deviceorientation change', function() {

    function fakeADeviceOrientationChangeTo(degrees) {
      mockedDomUtil.onDeviceOrientationChange.andCallFake(function(cb) { cb(degrees); });
      startApp();
    }

    it('when event fires from the DOM it shall rotate', function() {
      var degrees = 42;
      mockedConvert.deviceOrientationEventToDegrees.andReturn(degrees);

      fakeADeviceOrientationChangeTo(degrees);

      expect(mockedDomUtil.rotate).toHaveBeenCalledWith(degrees);
    });
  });
});
