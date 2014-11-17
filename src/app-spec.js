var App = require('./app');
var mockedDomUtil = require('./mocks/domUtil');

var convert = {
  scrollPositionToDegrees: function(scrollPosition) {
    return scrollPosition.top / 2;
  },
  deviceOrientationEventToDegrees: function(event) {
    return event.alpha;
  }
};

describe('after app start', function() {

  beforeEach(function() {
    spyOn(mockedDomUtil, 'rotate');
  });

  function startApp() {
    var app = new App(mockedDomUtil, convert);
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
      spyOn(convert, 'scrollPositionToDegrees').andReturn(degrees);

      startApp();
      fakeOnScrollCallback(degrees);

      expect(mockedDomUtil.rotate).toHaveBeenCalledWith(degrees);
    });

    it('should convert scroll position to degrees', function() {
      var degrees = 42;
      var scrollPosition = {top: degrees};
      var expected = convert.scrollPositionToDegrees(scrollPosition);

      startApp();
      fakeOnScrollCallback(scrollPosition);

      expect(mockedDomUtil.rotate).toHaveBeenCalledWith(expected);
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
      spyOn(convert, 'deviceOrientationEventToDegrees').andReturn(degrees);

      startApp();
      fakeOnDeviceOrientationChangeCallback(degrees);

      expect(mockedDomUtil.rotate).toHaveBeenCalledWith(degrees);
    });
    it('should convert deviceorientation event to degrees', function() {
      var degrees = 42;
      var event = {alpha: degrees};
      var expected = convert.deviceOrientationEventToDegrees(event);

      startApp();
      fakeOnDeviceOrientationChangeCallback(event);

      expect(mockedDomUtil.rotate).toHaveBeenCalledWith(expected);
    });
  });
});
