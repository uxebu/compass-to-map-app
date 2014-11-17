var DeviceOrientationBehaviorApp = require('./deviceorientation-behavior-app');
var createDomUtilMock = require('./mocks/domUtilMockCreator');
var createConvertMock = require('./mocks/convertMockCreator');

describe('after app start', function() {

  var mockedDomUtil;
  var mockedConvert;

  beforeEach(function() {
    mockedDomUtil = createDomUtilMock();
    mockedConvert = createConvertMock();
  });

  it('rotate on deviceorientation change', function() {
    mockedDomUtil.hasDeviceOrientation.andReturn(true);
    var degrees = 23;
    startAppAndFakeADeviceOrientationChangeTo(degrees);

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

    expect(mockedDomUtil.showInputType).toHaveBeenCalledWith(DeviceOrientationBehaviorApp.INPUT_TYPE_COMPASS);
  });

  function startApp() {
    var app = new DeviceOrientationBehaviorApp(mockedDomUtil, mockedConvert);
    app.start();
  }

  function startAppAndFakeADeviceOrientationChangeTo(degrees) {
    var onDeviceOrienationChangeCallback;
    mockedConvert.deviceOrientationEventToDegrees.andReturn(degrees);
    mockedDomUtil.onDeviceOrientationChange.andCallFake(function(cb) { onDeviceOrienationChangeCallback = cb; });
    startApp();
    onDeviceOrienationChangeCallback && onDeviceOrienationChangeCallback(degrees);
  }

});
