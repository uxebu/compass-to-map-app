function DeviceOrientationBehaviorApp(domUtil, convert, timeUtil) {
  this._domUtil = domUtil;
  this._convert = convert;
  this._timeUtil = timeUtil;
}

DeviceOrientationBehaviorApp.INPUT_TYPE = 'Compass';

DeviceOrientationBehaviorApp.prototype = {
  start: function() {
    this._domUtil.onDeviceOrientationChange(this._rotateByDeviceOrienationEvent.bind(this));
    this._domUtil.showInputType(DeviceOrientationBehaviorApp.INPUT_TYPE);
  },

  _rotateByDeviceOrienationEvent: function(event) {
    this._lastEventTimestamp = new Date();
    this._rotateByDegrees(this._convert.deviceOrientationEventToDegrees(event));
  },

  _rotateByDegrees: function(degrees) {
    this._domUtil.rotate(degrees);
  },

  _lastEventTimestamp: null,
  hasReceivedEventLately: function(timeSince) {
    if (this._lastEventTimestamp == null) {
      return false;
    }
    return this._timeUtil.timePassedSince(this._lastEventTimestamp) <= timeSince;
  }
};

module.exports = DeviceOrientationBehaviorApp;