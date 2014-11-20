import {assert} from './test-helper/assert'
import {ScrollBehaviorApp} from './scroll-behavior-app'
import {createMock as createDomUtilMock} from './mocks/domUtilMockCreator'
import {createMock as createConvertMock} from './mocks/convertMockCreator'

describe('after app start', function() {

  var mockedDomUtil;
  var mockedConvert;

  beforeEach(function() {
    mockedDomUtil = createDomUtilMock(this.sinon);
    mockedConvert = createConvertMock(this.sinon);
  });

  describe('and page was loaded', function() {
    it('rotate on scroll', function() {
      var scrollOffset = 42;
      startAppAndFakeAScrollTo(scrollOffset);

      assert.calledWith(mockedDomUtil.rotate, scrollOffset);
    });

    it('should update UI', function() {
      startApp();
      assert.calledWith(mockedDomUtil.showInputType, ScrollBehaviorApp.INPUT_TYPE);
    });
  });

  function startApp() {
    var app = new ScrollBehaviorApp(mockedDomUtil, mockedConvert);
    app.start();
  }

  function startAppAndFakeAScrollTo(scrollOffset) {
    mockedConvert.scrollPositionToDegrees.returns(scrollOffset);
    startApp();
    mockedDomUtil.onScroll.yield(scrollOffset);
  }

});
