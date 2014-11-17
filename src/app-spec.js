var App = require('./app');
var mockedDomUtil = require('./interfaces/domUtil');
var mockedConvert = require('./interfaces/convert');

describe('after app start', function() {

  beforeEach(function() {
    spyOn(mockedDomUtil, 'rotate');
  });

  function startApp() {
    var app = new App(mockedDomUtil, mockedConvert);
    app.start();
  }

  describe('rotate on scroll', function() {
    var onScrollCallback;
    beforeEach(function() {
      spyOn(mockedDomUtil, 'onScroll').andCallFake(function(cb) { onScrollCallback = cb; });
    });

    function fakeOnScrollCallback(degrees) {
      onScrollCallback(degrees);
    }

    it('when onScroll fires from the DOM it shall rotate', function() {
      var degrees = 42;
      spyOn(mockedConvert, 'scrollPositionToDegrees').andReturn(degrees);

      startApp();
      fakeOnScrollCallback(degrees);

      expect(mockedDomUtil.rotate).toHaveBeenCalledWith(degrees);
    });
  });


  describe('rotate on deviceorientation change', function() {
    var onDeviceOrientationChangeCallback;
    beforeEach(function() {
      spyOn(mockedDomUtil, 'onDeviceOrientationChange').andCallFake(function(cb) { onDeviceOrientationChangeCallback = cb; });
    });

    function fakeOnDeviceOrientationChangeCallback(degrees) {
      onDeviceOrientationChangeCallback(degrees);
    }

    it('when event fires from the DOM it shall rotate', function() {
      var degrees = 42;
      spyOn(mockedConvert, 'deviceOrientationEventToDegrees').andReturn(degrees);

      startApp();
      fakeOnDeviceOrientationChangeCallback(degrees);

      expect(mockedDomUtil.rotate).toHaveBeenCalledWith(degrees);
    });
  });
});
