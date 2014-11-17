var DeviceOrientationBehaviorApp = require('./deviceorientation-behavior-app');
var createDomUtilMock = require('./mocks/domUtilMockCreator');
var createConvertMock = require('./mocks/convertMockCreator');

describe('after app start', function() {

  var mockedDomUtil;
  var mockedConvert;
  var app;

  beforeEach(function() {
    mockedDomUtil = createDomUtilMock();
    mockedConvert = createConvertMock();
  });

  it('rotate on deviceorientation change', function() {
    var degrees = 23;
    startAppAndFakeADeviceOrientationChangeTo(degrees);
    expect(mockedDomUtil.rotate).toHaveBeenCalledWith(degrees);
  });

  it('should NOT act on scroll', function() {
    startApp();
    expect(mockedDomUtil.onScroll).not.toHaveBeenCalled();
  });

  it('should update UI', function() {
    startApp();
    expect(mockedDomUtil.showInputType).toHaveBeenCalledWith(DeviceOrientationBehaviorApp.INPUT_TYPE);
  });

  describe('hasReceievedEventLately', function() {
    it('should report FALSE if NO events have been received in the given interval', function() {
      expect(app.hasReceivedEventLately(0)).toBe(false);
    });
    it('should report TRUE if events have been received in the given interval', function() {
      startAppAndFakeADeviceOrientationChangeTo(1);
      expect(app.hasReceivedEventLately(0)).toBe(true);
    });
  });

  function startApp() {
    app = new DeviceOrientationBehaviorApp(mockedDomUtil, mockedConvert);
    app.start();
  }

  function startAppAndFakeADeviceOrientationChangeTo(degrees) {
    var onDeviceOrienationChangeCallback;
    mockedConvert.deviceOrientationEventToDegrees.andReturn(degrees);
    mockedDomUtil.onDeviceOrientationChange.andCallFake(function(cb) { onDeviceOrienationChangeCallback = cb; });
    startApp();
    onDeviceOrienationChangeCallback(degrees);
  }

});
