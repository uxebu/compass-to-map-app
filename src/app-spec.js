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

  describe('and page was loaded', function() {

    beforeEach(function() {
      mockedDomUtil.onPageLoaded.andCallFake(function(fn) { fn(); })
    });

    xdescribe('switch back to scroll if deviceorientation doesnt change', function() {
      it('should switch after given interval', function() {
        jasmine.Clock.useMock();
        mockedDomUtil.hasDeviceOrientation.andReturn(true);

        var scrollCb;
        mockedDomUtil.onScroll.andCallFake(function(cb) { scrollCb = cb; });
        startApp();
        jasmine.Clock.tick(App.DEVICEORIENTAION_TIMEOUT); // forward clock by timeout

        var scrollOffset = 42;
        mockedConvert.scrollPositionToDegrees.andReturn(scrollOffset);
        scrollCb(scrollOffset);

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
    it('scrolling should not rotate yet', function() {
      mockedDomUtil.hasDeviceOrientation.andReturn(false);

      startAppAndFakeAScrollTo(1);

      expect(mockedDomUtil.rotate).not.toHaveBeenCalled();
    });

    it('deviceorientation should not rotate yet', function() {
      mockedDomUtil.hasDeviceOrientation.andReturn(true);

      startAppAndFakeADeviceOrientationChangeTo(1);

      expect(mockedDomUtil.rotate).not.toHaveBeenCalled();
    });
  });

  function startAppAndFakeAScrollTo(scrollOffset) {
    var onScrollCallback;
    mockedConvert.scrollPositionToDegrees.andReturn(scrollOffset);
    mockedDomUtil.onScroll.andCallFake(function(cb) { onScrollCallback = cb; });
    startApp();
    onScrollCallback && onScrollCallback(scrollOffset);
  }

  function startAppAndFakeADeviceOrientationChangeTo(degrees) {
    var onDeviceOrienationChangeCallback;
    mockedConvert.deviceOrientationEventToDegrees.andReturn(degrees);
    mockedDomUtil.onDeviceOrientationChange.andCallFake(function(cb) { onDeviceOrienationChangeCallback = cb; });
    startApp();
    onDeviceOrienationChangeCallback && onDeviceOrienationChangeCallback(degrees);
  }

  function startApp() {
    var app = new App(mockedDomUtil, mockedConvert);
    app.start();
  }

});
