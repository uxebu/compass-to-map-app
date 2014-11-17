var App = require('./app');
var mockedDomUtil = require('./mocks/domUtil');
var mockedConvert = require('./mocks/convert');

describe('after app start', function() {

  function startApp() {
    var app = new App(mockedDomUtil, mockedConvert);
    app.start();
  }

  describe('rotate on scroll', function() {
    var onScrollCallback;
    beforeEach(function() {
      mockedDomUtil.onScroll.andCallFake(function(cb) { onScrollCallback = cb; });
    });

    function fakeOnScrollCallback(degrees) {
      onScrollCallback(degrees);
    }

    it('when onScroll fires from the DOM it shall rotate', function() {
      var degrees = 42;
      mockedConvert.scrollPositionToDegrees.andReturn(degrees);

      startApp();
      fakeOnScrollCallback(degrees);

      expect(mockedDomUtil.rotate).toHaveBeenCalledWith(degrees);
    });
  });


  describe('rotate on deviceorientation change', function() {
    var onDeviceOrientationChangeCallback;
    beforeEach(function() {
      mockedDomUtil.onDeviceOrientationChange.andCallFake(function(cb) { onDeviceOrientationChangeCallback = cb; });
    });

    function fakeOnDeviceOrientationChangeCallback(degrees) {
      onDeviceOrientationChangeCallback(degrees);
    }

    it('when event fires from the DOM it shall rotate', function() {
      var degrees = 42;
      mockedConvert.deviceOrientationEventToDegrees.andReturn(degrees);

      startApp();
      fakeOnDeviceOrientationChangeCallback(degrees);

      expect(mockedDomUtil.rotate).toHaveBeenCalledWith(degrees);
    });
  });
});
