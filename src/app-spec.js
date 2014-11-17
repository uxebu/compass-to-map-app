var App = require('./app');
var createDomUtilMock = require('./mocks/domUtilMockCreator');
var createConvertMock = require('./mocks/convertMockCreator');

describe('after app start', function() {

  var mockedDomUtil;
  var mockedConvert;

  beforeEach(function() {
    mockedDomUtil = createDomUtilMock();
    mockedConvert = createConvertMock();
  });

  it('rotate on scroll', function() {
    mockedDomUtil.hasDeviceOrientation.andReturn(false);
    var scrollOffset = 42;
    fakeAScrollTo(scrollOffset);

    expect(mockedDomUtil.rotate).toHaveBeenCalledWith(scrollOffset);
  });

  it('rotate on deviceorientation change', function() {
    mockedDomUtil.hasDeviceOrientation.andReturn(true);
    var degrees = 23;
    fakeADeviceOrientationChangeTo(degrees);

    expect(mockedDomUtil.rotate).toHaveBeenCalledWith(degrees);
  });

  it('should only use deviceorientation if available', function() {
    mockedDomUtil.hasDeviceOrientation.andReturn(true);

    startApp();

    expect(mockedDomUtil.onScroll).not.toHaveBeenCalled();
  });

  it('should inform the UI what event is being used', function() {
    mockedDomUtil.hasDeviceOrientation.andReturn(true);

    startApp();

    expect(mockedDomUtil.showInputType).toHaveBeenCalledWith(App.INPUT_TYPE_COMPASS);
  });

  function startApp() {
    var app = new App(mockedDomUtil, mockedConvert);
    app.start();
  }

  function fakeAScrollTo(scrollOffset) {
    mockedConvert.scrollPositionToDegrees.andReturn(scrollOffset);
    mockedDomUtil.onScroll.andCallFake(function(cb) { cb(scrollOffset); });
    startApp();
  }

  function fakeADeviceOrientationChangeTo(degrees) {
    mockedConvert.deviceOrientationEventToDegrees.andReturn(degrees);
    mockedDomUtil.onDeviceOrientationChange.andCallFake(function(cb) { cb(degrees); });
    startApp();
  }

});
