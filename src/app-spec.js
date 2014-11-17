var App = require('./app');
var createDomUtilMock = require('./mocks/domUtil');
var mockedConvert = require('./mocks/convert');

describe('after app start', function() {

  var mockedDomUtil;

  beforeEach(function() {
    mockedDomUtil = createDomUtilMock();
  });

  it('rotate on scroll', function() {
    var scrollOffset = 42;
    fakeAScrollTo(scrollOffset, mockedDomUtil);

    expect(mockedDomUtil.rotate).toHaveBeenCalledWith(scrollOffset);
  });

  it('rotate on deviceorientation change', function() {
    var degrees = 23;

    expect(mockedDomUtil.rotate).toHaveBeenCalledWith(degrees);
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

