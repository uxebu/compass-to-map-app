var App = require('./app');
var createDomUtilMock = require('./mocks/domUtilMockCreator');

function FakeApp() {
  this.start = function() {};
}

describe('after app start', function() {

  var mockedDomUtil;
  var scrollApp;
  var deviceRotationApp;

  beforeEach(function() {
    mockedDomUtil = createDomUtilMock();
    scrollApp = new FakeApp();
    spyOn(scrollApp, 'start');
    deviceRotationApp = new FakeApp();
    spyOn(deviceRotationApp, 'start')
  });

  describe('and page was loaded', function() {

    beforeEach(function() {
      mockedDomUtil.onPageLoaded.andCallFake(function(fn) { fn(); })
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

    xdescribe('switch back to scroll if deviceorientation doesnt change', function() {
      it('should switch after given interval', function() {
        expect(mockedDomUtil.rotate).toHaveBeenCalledWith(scrollOffset);
      });
      it('should update the input type shown', function() {
        
        //expect(mockedDomUtil.showInputType).toHaveBeenCalledWith(App.INPUT_TYPE_SCROLL);
      });
      it('should disconnect the deviceorientation hook', function() {

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
