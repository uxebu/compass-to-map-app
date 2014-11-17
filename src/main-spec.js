var domUtil = {
  rotate: function() {},
  onScroll: function() {},
  onDeviceOrientationChange: function() {}
};

var app = {
  start: function() {
    domUtil.onScroll(function(scrollPos) {
      rotateByDegrees(convert.scrollPositionToDegrees(scrollPos));
    });
    domUtil.onDeviceOrientationChange(rotateByDegrees);
  }
};

function rotateByDegrees(degrees) {
  domUtil.rotate(degrees);
}

var convert = {
  scrollPositionToDegrees: function(scrollPosition) {
    return scrollPosition.top / 2;
  }
};

describe('after app start', function() {

  beforeEach(function() {
    spyOn(domUtil, 'rotate');
  });

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

      app.start();
      fakeOnScrollCallback(degrees);

      expect(domUtil.rotate).toHaveBeenCalledWith(degrees);
    });

    it('should convert scroll position to degrees', function() {
      var degrees = 42;
      var scrollPosition = {top: degrees};
      var expected = convert.scrollPositionToDegrees(scrollPosition);

      app.start();
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
      app.start();
      fakeOnDeviceOrientationChangeCallback(degrees);
      expect(domUtil.rotate).toHaveBeenCalledWith(degrees);
    });
  });
});
