var App = require('./app');
var createDomUtilMock = require('./mocks/domUtilMockCreator');
var DeviceRotationApp = require('./deviceorientation-behavior-app');

function createFakeApp(className) {
  var methods = [
    'start',
    'stop'
  ];
  return jasmine.createSpyObj(className, methods);
}

describe('after app start', function() {

  var mockedDomUtil;
  var scrollApp;
  var deviceRotationApp;

  beforeEach(function() {
    mockedDomUtil = createDomUtilMock();
    scrollApp = createFakeApp('ScrollApp');

    deviceRotationApp = new DeviceRotationApp();
    spyOn(deviceRotationApp, 'start');
    spyOn(deviceRotationApp, 'stop');

    jasmine.Clock.useMock();
  });
  afterEach(function() {
    jasmine.Clock.tick(App.APP_WATCHER_TIMEOUT);
  });

  describe('and page was loaded', function() {

    beforeEach(function() {
      mockedDomUtil.onPageLoaded.andCallFake(function(fn) { fn(); });
    });

    it('should start the scroll app yet', function() {
      mockedDomUtil.hasDeviceOrientation.andReturn(false);

      startApp();

      expect(scrollApp.start).toHaveBeenCalled();
    });

    it('deviceorientation should not rotate yet', function() {
      mockedDomUtil.hasDeviceOrientation.andReturn(true);

      startApp();

      expect(deviceRotationApp.start).toHaveBeenCalled();
    });

    describe('switch back to scroll if deviceorientation doesnt change', function() {

      beforeEach(function() {
        mockedDomUtil.hasDeviceOrientation.andReturn(true);
        spyOn(deviceRotationApp, '_isStalledSince').andReturn(true);

        var app = new App(mockedDomUtil, scrollApp, deviceRotationApp);
        app.start();
        jasmine.Clock.tick(App.APP_WATCHER_TIMEOUT);
      });

      it('should switch after given interval', function() {
        expect(scrollApp.start).toHaveBeenCalled();
      });
      it('should disconnect the deviceorientation hook', function() {
        expect(deviceRotationApp.stop).toHaveBeenCalled();
      });
    });

  });

  describe('if page has not been loaded yet', function() {
    it('should not start the scroll app yet', function() {
      mockedDomUtil.hasDeviceOrientation.andReturn(false);

      startApp();

      expect(scrollApp.start).not.toHaveBeenCalled();
    });

    it('deviceorientation should not rotate yet', function() {
      mockedDomUtil.hasDeviceOrientation.andReturn(true);

      startApp();

      expect(deviceRotationApp.start).not.toHaveBeenCalled();
    });
  });

  function startApp() {
    var app = new App(mockedDomUtil, scrollApp, deviceRotationApp);
    app.start();
  }

});
