var domUtil = {
  rotate: function() {},
  onScroll: function() {}
};

var app = {
  start: function() {
    domUtil.onScroll(function(degrees) {
      domUtil.rotate(degrees);
    });
  }
};

describe('rotate on an event', function() {

  var onScrollCallback;
  beforeEach(function() {
    spyOn(domUtil, 'rotate');
    spyOn(domUtil, 'onScroll').andCallFake(function(cb) { onScrollCallback = cb; });
  });

  function emulateDocumentScrollEvent(degrees) {
    domUtil.rotate(degrees);
  }
  function emulateDeviceOrientationChange(degrees) {
    domUtil.rotate(degrees);
  }
  function callOnScrollCallback(degrees) {
    app.start();
    onScrollCallback(degrees);
  }

  describe('on scroll', function() {
    it('should be triggered', function() {
      var degrees = 42;
      emulateDocumentScrollEvent(degrees);
      expect(domUtil.rotate).toHaveBeenCalledWith(degrees);
    });
    it('when onScroll fires from the DOM it shall rotate', function() {
      var degrees = 42;
      callOnScrollCallback(degrees);
      expect(domUtil.rotate).toHaveBeenCalledWith(degrees);
    });
  });
  it('should be triggered on deviceorientation change', function() {
    var degrees = 42;
    emulateDeviceOrientationChange(degrees);
    expect(domUtil.rotate).toHaveBeenCalledWith(degrees);
  });
});