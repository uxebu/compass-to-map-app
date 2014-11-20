export function createMock(sinon) {
  var domUtil = {
    onScroll: function() {},
    onDeviceOrientationChange: function() {},
    offDeviceOrientationChange: function() {},
    rotate: function() {},
    hasDeviceOrientation: function() {},
    showInputType: function() {},
    onPageLoaded: function() {}
  };
  sinon.stub(domUtil);
  return domUtil;
}