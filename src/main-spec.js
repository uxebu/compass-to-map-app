var domUtil = {
  rotate: function() {},
  onScroll: function() {},
  onDeviceOrientationChange: function() {}
};

var app = {
  start: function() {
    domUtil.onScroll(function(degrees) {
      domUtil.rotate(degrees);
    });
    domUtil.onDeviceOrientationChange(function(degrees) {
      domUtil.rotate(degrees);
    });
  }
};

describe('on app start rotate on an event', function() {

  beforeEach(function() {
    spyOn(domUtil, 'rotate');
  });

  describe('on scroll', function() {
    var onScrollCallback;
    beforeEach(function() {
      spyOn(domUtil, 'onScroll').andCallFake(function(cb) { onScrollCallback = cb; });
    });

    function callOnScrollCallback(degrees) {
      onScrollCallback(degrees);
    }

    it('when onScroll fires from the DOM it shall rotate', function() {
      var degrees = 42;
      app.start();
      callOnScrollCallback(degrees);
      expect(domUtil.rotate).toHaveBeenCalledWith(degrees);
    });
  });
  describe('on deviceorientation change', function() {
    var onDeviceOrientationChangeCallback;
    beforeEach(function() {
      spyOn(domUtil, 'onDeviceOrientationChange').andCallFake(function(cb) { onDeviceOrientationChangeCallback = cb; });
    });

    function callOnDeviceOrientationChangeCallback(degrees) {
      onDeviceOrientationChangeCallback(degrees);
    }

    it('when event fires from the DOM it shall rotate', function() {
      var degrees = 42;
      app.start();
      callOnDeviceOrientationChangeCallback(degrees);
      expect(domUtil.rotate).toHaveBeenCalledWith(degrees);
    });
  });
});