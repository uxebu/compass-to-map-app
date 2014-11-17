var App = require('./app');
var mockedDomUtil = require('./mocks/domUtil');
var mockedConvert = require('./mocks/convert');

describe('after app start', function() {

  it('rotate on scroll', function() {
    var scrollOffset = 42;
    mockedConvert.scrollPositionToDegrees.andReturn(scrollOffset);

    fakeAScrollTo(scrollOffset);

    expect(mockedDomUtil.rotate).toHaveBeenCalledWith(scrollOffset);
  });

  it('rotate on deviceorientation change', function() {
    var degrees = 23;
    mockedConvert.deviceOrientationEventToDegrees.andReturn(degrees);

    fakeADeviceOrientationChangeTo(degrees);

    expect(mockedDomUtil.rotate).toHaveBeenCalledWith(degrees);
  });
});

function startApp() {
  var app = new App(mockedDomUtil, mockedConvert);
  app.start();
}

function fakeAScrollTo(degrees) {
  mockedDomUtil.onScroll.andCallFake(function(cb) { cb(degrees); });
  startApp();
}

function fakeADeviceOrientationChangeTo(degrees) {
  mockedDomUtil.onDeviceOrientationChange.andCallFake(function(cb) { cb(degrees); });
  startApp();
}

