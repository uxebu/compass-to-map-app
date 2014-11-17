var methodNames = [
  'onScroll',
  'onDeviceOrientationChange',
  'rotate',
  'hasDeviceOrientation',
  'showInputType',
  'onPageLoaded'
];

function createMock() {
  return jasmine.createSpyObj('domUtil', methodNames);
}

module.exports = createMock;