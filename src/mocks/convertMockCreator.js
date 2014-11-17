var methodNames = [
  'scrollPositionToDegrees',
  'deviceOrientationEventToDegrees'
];

function createMock() {
  return jasmine.createSpyObj('convert', methodNames);
}

module.exports = createMock;