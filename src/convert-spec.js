var convert = require('./convert');

describe('convert', function() {

  it('scroll position to degrees', function() {
    var degrees = 42;
    var scrollPosition = {top: degrees};
    expect(convert.scrollPositionToDegrees(scrollPosition)).toBe(degrees/2);
  });

  it('deviceorientation event to degrees', function() {
    var degrees = 42;
    var event = {alpha: degrees};
    expect(convert.deviceOrientationEventToDegrees(event)).toBe(degrees);
  });
});
