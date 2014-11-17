function DeviceOrientationBehaviorApp(domUtil, convert) {
  this._domUtil = domUtil;
  this._convert = convert;
}

DeviceOrientationBehaviorApp.INPUT_TYPE_COMPASS = 'Compass';

DeviceOrientationBehaviorApp.prototype = {
  start: function() {
    this._domUtil.onDeviceOrientationChange(this._rotateByDeviceOrienationEvent.bind(this));
    this._domUtil.showInputType(DeviceOrientationBehaviorApp.INPUT_TYPE_COMPASS);
  },

  _rotateByDeviceOrienationEvent: function(event) {
    this._rotateByDegrees(this._convert.deviceOrientationEventToDegrees(event));
  },

  _rotateByDegrees: function(degrees) {
    this._domUtil.rotate(degrees);
  }
};

module.exports = DeviceOrientationBehaviorApp;