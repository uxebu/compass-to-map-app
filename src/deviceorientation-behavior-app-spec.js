import {assert} from './test-helper/assert'
import {DeviceOrientationBehaviorApp} from './deviceorientation-behavior-app'
import {createMock as createDomUtilMock} from './mocks/domUtilMockCreator'
import {createMock as createConvertMock} from './mocks/convertMockCreator'


describe('after app start', function() {

  var mockedDomUtil;
  var mockedConvert;
  var app;
  var timeUtilMock;

  beforeEach(function() {
    mockedDomUtil = createDomUtilMock(this.sinon);
    mockedConvert = createConvertMock(this.sinon);
    var timeUtil = {
      timePassedSince: function() {}
    };
    timeUtilMock = this.sinon.stub(timeUtil);
  });

  it('rotate on deviceorientation change', function() {
    var degrees = 23;
    startAppAndFakeADeviceOrientationChangeTo(degrees);
    expect(mockedDomUtil.rotate).toHaveBeenCalledWith(degrees);
  });

  it('should update UI', function() {
    startApp();
    expect(mockedDomUtil.showInputType).toHaveBeenCalledWith(DeviceOrientationBehaviorApp.INPUT_TYPE);
  });

  it('should not rotate if alpha=null', function() {
    startAppAndFakeADeviceOrientationChangeTo(null);

    expect(mockedDomUtil.rotate).not.toHaveBeenCalled();
  });

  it('should disconnect on stop() call', function() {
    var onDeviceOrienationChangeCallback;
    var degrees = 10;
    mockedConvert.deviceOrientationEventToDegrees.andReturn(degrees);
    mockedDomUtil.onDeviceOrientationChange.andCallFake(function(cb) { onDeviceOrienationChangeCallback = cb; });
    startApp();
    app.stop();

    expect(mockedDomUtil.offDeviceOrientationChange).toHaveBeenCalledWith(onDeviceOrienationChangeCallback);
  });

  describe('does really fire deviceorientation events', function() {

    describe('if not', function() {
      it('should fire doWhenStalledForGivenTime() after XX seconds', function() {
        var stalledCallback = jasmine.createSpy('stalledCallback');
        jasmine.Clock.useMock();
        var timeSince = 42;

        startApp();
        app.doWhenStalledForGivenTime(timeSince, stalledCallback);
        jasmine.Clock.tick(timeSince);

        expect(stalledCallback).toHaveBeenCalled();
      });
    });

    describe('if so', function() {
      it('should NOT fire doWhenStalledForGivenTime() after XX seconds', function() {
        var stalledCallback = jasmine.createSpy('stalledCallback');
        jasmine.Clock.useMock();
        var timeSince = 23;

        startAppAndFakeADeviceOrientationChangeTo(100);
        app.doWhenStalledForGivenTime(timeSince, stalledCallback);
        jasmine.Clock.tick(timeSince);

        expect(stalledCallback).not.toHaveBeenCalled();
      });
    });

  });

  function startApp() {
    app = new DeviceOrientationBehaviorApp(mockedDomUtil, mockedConvert, timeUtilMock);
    app.start();
  }

  function startAppAndFakeADeviceOrientationChangeTo(degrees) {
    mockedConvert.deviceOrientationEventToDegrees.returns(degrees);
    startApp();
    mockedDomUtil.onDeviceOrientationChange.yield({alpha: degrees});
  }

});
