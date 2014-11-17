function DeviceOrientationBehaviorApp(domUtil, convert) {
  this._domUtil = domUtil;
  this._convert = convert;
}

DeviceOrientationBehaviorApp.INPUT_TYPE = 'Compass';

DeviceOrientationBehaviorApp.prototype = {
  start: function() {
    this._domUtil.onDeviceOrientationChange(this._rotateByDeviceOrienationEvent.bind(this));
    this._domUtil.showInputType(DeviceOrientationBehaviorApp.INPUT_TYPE);
  },

  _rotateByDeviceOrienationEvent: function(event) {
    this._hasReceivedEvent = true;
    this._rotateByDegrees(this._convert.deviceOrientationEventToDegrees(event));
  },

  _rotateByDegrees: function(degrees) {
    this._domUtil.rotate(degrees);
  },

  _hasReceivedEvent: false,
  hasReceivedEventLately: function() {
    return this._hasReceivedEvent;
  }
};

module.exports = DeviceOrientationBehaviorApp;