import {App} from './app';
import {createMock as createDomUtilMock} from './mocks/domUtilMockCreator';
import {assert} from './test-helper/assert';

function createFakeApp(sinon) {
  var app = {
    start: function() {},
    stop: function() {},
    doWhenStalledForGivenTime: function() {}
  };
  sinon.stub(app);
  return app;
}

describe('after app start', function() {

  var mockedDomUtil;
  var scrollApp;
  var deviceRotationApp;

  beforeEach(function() {
    mockedDomUtil = createDomUtilMock(this.sinon);
    scrollApp = createFakeApp(this.sinon);
    deviceRotationApp = createFakeApp(this.sinon);
  });

  describe('and page was loaded', function() {

    beforeEach(function() {
      mockedDomUtil.onPageLoaded.yields();
    });

    it('should start the scroll app yet', function() {
      mockedDomUtil.hasDeviceOrientation.returns(false);

      startApp();

      assert.called(scrollApp.start);
    });

    it('deviceorientation should not rotate yet', function() {
      mockedDomUtil.hasDeviceOrientation.returns(true);

      startApp();

      assert.called(deviceRotationApp.start);
    });

    describe('switch back to scroll if deviceorientation stalled', function() {

      beforeEach(function() {
        mockedDomUtil.hasDeviceOrientation.returns(true);
        deviceRotationApp.doWhenStalledForGivenTime.yields();

        startApp();
      });

      it('should switch after given interval', function() {
        assert.called(scrollApp.start);
      });
      it('should disconnect the deviceorientation hook', function() {
        assert.called(deviceRotationApp.stop);
      });
    });

  });

  describe('if page has not been loaded yet', function() {
    it('should not start the scroll app yet', function() {
      mockedDomUtil.hasDeviceOrientation.returns(false);

      startApp();

      assert.notCalled(scrollApp.start);
    });

    it('deviceorientation should not rotate yet', function() {
      mockedDomUtil.hasDeviceOrientation.returns(true);

      startApp();

      assert.notCalled(deviceRotationApp.start);
    });
  });

  function startApp() {
    var app = new App(mockedDomUtil, scrollApp, deviceRotationApp);
    app.start();
  }

});
