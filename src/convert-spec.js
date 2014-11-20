import {assert} from './test-helper/assert'
import {convert} from './convert'

describe('convert', function() {

  it('scroll position to degrees', function() {
    var degrees = 42;
    var scrollPosition = {top: degrees};
    assert.equal(convert.scrollPositionToDegrees(scrollPosition), degrees/2);
  });

  it('deviceorientation event to degrees', function() {
    var degrees = 42;
    var event = {alpha: degrees};
    assert.equal(convert.deviceOrientationEventToDegrees(event), degrees);
  });
});
