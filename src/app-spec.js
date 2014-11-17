var App = require('./app');
var createDomUtilMock = require('./mocks/domUtil');
var mockedConvert = require('./mocks/convert');

describe('after app start', function() {

  var mockedDomUtil;

  beforeEach(function() {
    mockedDomUtil = createDomUtilMock();
  });

  it('rotate on scroll', function() {
    mockedDomUtil.hasDeviceOrientation.andReturn(false);
    var scrollOffset = 42;
    fakeAScrollTo(scrollOffset, mockedDomUtil);

    expect(mockedDomUtil.rotate).toHaveBeenCalledWith(scrollOffset);
  });

  it('rotate on deviceorientation change', function() {
    mockedDomUtil.hasDeviceOrientation.andReturn(true);
    var degrees = 23;
    fakeADeviceOrientationChangeTo(degrees, mockedDomUtil);

    expect(mockedDomUtil.rotate).toHaveBeenCalledWith(degrees);
  });

  it('should only use deviceorientation if available', function() {
    mockedDomUtil.hasDeviceOrientation.andReturn(true);

    startApp(mockedDomUtil);

    expect(mockedDomUtil.onScroll).not.toHaveBeenCalled();
  });
});

function startApp(mockedDomUtil) {
  var app = new App(mockedDomUtil, mockedConvert);
  app.start();
}

function fakeAScrollTo(scrollOffset, mockedDomUtil) {
  mockedConvert.scrollPositionToDegrees.andReturn(scrollOffset);
  mockedDomUtil.onScroll.andCallFake(function(cb) { cb(scrollOffset); });
  startApp(mockedDomUtil);
}

function fakeADeviceOrientationChangeTo(degrees, mockedDomUtil) {
  mockedConvert.deviceOrientationEventToDegrees.andReturn(degrees);
  mockedDomUtil.onDeviceOrientationChange.andCallFake(function(cb) { cb(degrees); });
  startApp(mockedDomUtil);
}

