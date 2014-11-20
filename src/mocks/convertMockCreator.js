export function createMock(sinon) {
  var convert = {
    scrollPositionToDegrees: function() {},
    deviceOrientationEventToDegrees: function() {}
  };
  sinon.stub(convert);
  return convert;
}