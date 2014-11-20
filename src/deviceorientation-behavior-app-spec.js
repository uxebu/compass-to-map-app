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
    assert.calledWith(mockedDomUtil.rotate, degrees);
  });

  it('should update UI', function() {
    startApp();
    assert.calledWith(mockedDomUtil.showInputType, DeviceOrientationBehaviorApp.INPUT_TYPE);
  });

  it('should not rotate if alpha=null', function() {
    startAppAndFakeADeviceOrientationChangeTo(null);

    assert.notCalled(mockedDomUtil.rotate);
  });

  it('should disconnect on stop() call', function() {
    var degrees = 10;
    mockedConvert.deviceOrientationEventToDegrees.returns(degrees);
    startApp();
    app.stop();

    // this check is way too complicated, try to simplify it!
    var onDeviceOrienationChangeCallback = mockedDomUtil.onDeviceOrientationChange.getCall(0).args[0];
    assert.calledWith(mockedDomUtil.offDeviceOrientationChange, onDeviceOrienationChangeCallback);
  });

  describe('does really fire deviceorientation events', function() {

    describe('if not', function() {
      it('should fire doWhenStalledForGivenTime() after XX seconds', function() {
        var stalledCallback = this.sinon.spy();
        var clock = this.sinon.useFakeTimers();
        var timeSince = 42;

        startApp();
        app.doWhenStalledForGivenTime(timeSince, stalledCallback);
        clock.tick(timeSince);

        assert.called(stalledCallback);
      });
    });

    describe('if so', function() {
      it('should NOT fire doWhenStalledForGivenTime() after XX seconds', function() {
        var stalledCallback = this.sinon.spy();
        var clock = this.sinon.useFakeTimers();
        var timeSince = 23;

        startAppAndFakeADeviceOrientationChangeTo(100);
        app.doWhenStalledForGivenTime(timeSince, stalledCallback);
        clock.tick(timeSince);

        assert.notCalled(stalledCallback);
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
