var methodNames = [
  'onScroll',
  'onDeviceOrientationChange',
  'rotate',
  'hasDeviceOrientation'
];

function createMock() {
  return jasmine.createSpyObj('domUtil', methodNames);
}

module.exports = createMock;