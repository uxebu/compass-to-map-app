var methodNames = [
  'onScroll',
  'onDeviceOrientationChange',
  'offDeviceOrientationChange',
  'rotate',
  'hasDeviceOrientation',
  'showInputType',
  'onPageLoaded'
];

function createMock() {
  return jasmine.createSpyObj('domUtil', methodNames);
}

module.exports = createMock;