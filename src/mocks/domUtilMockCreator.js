var methodNames = [
  'onScroll',
  'onDeviceOrientationChange',
  'rotate',
  'hasDeviceOrientation',
  'showInputType'
];

function createMock() {
  return jasmine.createSpyObj('domUtil', methodNames);
}

module.exports = createMock;