var ScrollBehaviorApp = require('./scroll-behavior-app');
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

    it('rotate on scroll', function() {
      mockedDomUtil.hasDeviceOrientation.andReturn(false);
      var scrollOffset = 42;

      startAppAndFakeAScrollTo(scrollOffset);

      expect(mockedDomUtil.rotate).toHaveBeenCalledWith(scrollOffset);
    });

    //it('should inform the UI what event is being used', function() {
    //  mockedDomUtil.hasDeviceOrientation.andReturn(true);
    //
    //  startApp();
    //
    //  expect(mockedDomUtil.showInputType).toHaveBeenCalledWith(ScrollBehaviorApp.INPUT_TYPE_COMPASS);
    //});
  });

  describe('if page has not been loaded yet', function() {
    it('scrolling should not rotate yet', function() {
      mockedDomUtil.hasDeviceOrientation.andReturn(false);

      startAppAndFakeAScrollTo(1);

      expect(mockedDomUtil.rotate).not.toHaveBeenCalled();
    });
  });

  function startApp() {
    var app = new ScrollBehaviorApp(mockedDomUtil, mockedConvert);
    app.start();
  }

  function startAppAndFakeAScrollTo(scrollOffset) {
    var onScrollCallback;
    mockedConvert.scrollPositionToDegrees.andReturn(scrollOffset);
    mockedDomUtil.onScroll.andCallFake(function(cb) { onScrollCallback = cb; });
    startApp();
    onScrollCallback && onScrollCallback(scrollOffset);
  }

});
