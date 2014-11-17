var domUtil = {
  rotate: function() {},
  onScroll: function() {},
  onDeviceOrientationChange: function() {}
};

function App(domUtil, convert) {
  this._domUtil = domUtil;
  this._convert = convert;
}
App.prototype = {
  start: function() {
    var convert = this._convert;
    this._domUtil.onScroll(function(scrollPos) {
      rotateByDegrees(convert.scrollPositionToDegrees(scrollPos));
    });
    this._domUtil.onDeviceOrientationChange(function(event) {
      rotateByDegrees(convert.deviceOrientationEventToDegrees(event));
    });
  }
};

function rotateByDegrees(degrees) {
  domUtil.rotate(degrees);
}

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
    spyOn(domUtil, 'rotate');
  });

  function startApp() {
    var app = new App(domUtil, convert);
    app.start();
  }

  describe('rotate on scroll', function() {
    var onScrollCallback;
    beforeEach(function() {
      spyOn(domUtil, 'onScroll').andCallFake(function(cb) { onScrollCallback = cb; });
    });

    function fakeOnScrollCallback(degrees) {
      onScrollCallback(degrees);
    }

    it('when onScroll fires from the DOM it shall rotate', function() {
      var degrees = 42;
      spyOn(convert, 'scrollPositionToDegrees').andReturn(degrees);

      startApp();
      fakeOnScrollCallback(degrees);

      expect(domUtil.rotate).toHaveBeenCalledWith(degrees);
    });

    it('should convert scroll position to degrees', function() {
      var degrees = 42;
      var scrollPosition = {top: degrees};
      var expected = convert.scrollPositionToDegrees(scrollPosition);

      startApp();
      fakeOnScrollCallback(scrollPosition);

      expect(domUtil.rotate).toHaveBeenCalledWith(expected);
    });
  });


  describe('rotate on deviceorientation change', function() {
    var onDeviceOrientationChangeCallback;
    beforeEach(function() {
      spyOn(domUtil, 'onDeviceOrientationChange').andCallFake(function(cb) { onDeviceOrientationChangeCallback = cb; });
    });

    function fakeOnDeviceOrientationChangeCallback(degrees) {
      onDeviceOrientationChangeCallback(degrees);
    }

    it('when event fires from the DOM it shall rotate', function() {
      var degrees = 42;
      spyOn(convert, 'deviceOrientationEventToDegrees').andReturn(degrees);

      startApp();
      fakeOnDeviceOrientationChangeCallback(degrees);

      expect(domUtil.rotate).toHaveBeenCalledWith(degrees);
    });
    it('should convert deviceorientation event to degrees', function() {
      var degrees = 42;
      var event = {alpha: degrees};
      var expected = convert.deviceOrientationEventToDegrees(event);

      startApp();
      fakeOnDeviceOrientationChangeCallback(event);

      expect(domUtil.rotate).toHaveBeenCalledWith(expected);
    });
  });
});
