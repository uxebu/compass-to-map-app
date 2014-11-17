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
    it('rotate on scroll', function() {
      var scrollOffset = 42;
      startAppAndFakeAScrollTo(scrollOffset);

      expect(mockedDomUtil.rotate).toHaveBeenCalledWith(scrollOffset);
    });

    it('should update UI', function() {
      startApp();
      expect(mockedDomUtil.showInputType).toHaveBeenCalledWith(ScrollBehaviorApp.INPUT_TYPE);
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
    onScrollCallback(scrollOffset);
  }

});
