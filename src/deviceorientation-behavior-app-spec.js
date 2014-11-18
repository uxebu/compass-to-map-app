var DeviceOrientationBehaviorApp = require('./deviceorientation-behavior-app');
var createDomUtilMock = require('./mocks/domUtilMockCreator');
var createConvertMock = require('./mocks/convertMockCreator');


describe('after app start', function() {

  var mockedDomUtil;
  var mockedConvert;
  var app;
  var timeUtilMock;

  beforeEach(function() {
    mockedDomUtil = createDomUtilMock();
    mockedConvert = createConvertMock();
    timeUtilMock = jasmine.createSpyObj('timeUtil', ['timePassedSince']);
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

  xit('should not rotate if alpha=null', function() {
    expect(true).toBe(false);
  });

  describe('hasReceievedEventLately', function() {

    describe('should report FALSE', function() {
      it('if NO events have been received', function() {
        startApp();
        expect(app.isStalledSince(0)).toBe(true);
      });
      it('if NO events have been received in the given interval', function() {
        timeUtilMock.timePassedSince.andReturn(1200);
        startApp();
        expect(app.isStalledSince(1000)).toBe(true);
      });
    });

    describe('should report TRUE', function() {
      it('if events have been received', function() {
        timeUtilMock.timePassedSince.andReturn(0);
        startAppAndFakeADeviceOrientationChangeTo(1);
        expect(app.isStalledSince(0)).toBe(false);
      });
      it('if events have been received shortly before the given interval', function() {
        timeUtilMock.timePassedSince.andReturn(900);

        startAppAndFakeADeviceOrientationChangeTo(1);

        expect(app.isStalledSince(1000)).toBe(false);
      });
    });
  });

  function startApp() {
    app = new DeviceOrientationBehaviorApp(mockedDomUtil, mockedConvert, timeUtilMock);
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
