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

  stop: function() {},

  _rotateByDeviceOrienationEvent: function(event) {
    this._lastEventTimestamp = new Date();
    this._rotateByDegrees(this._convert.deviceOrientationEventToDegrees(event));
  },

  _rotateByDegrees: function(degrees) {
    this._domUtil.rotate(degrees);
  },

  _lastEventTimestamp: null,
  _didNeverFireAnyEvent: function() {
    return this._lastEventTimestamp == null;
  },

  _firedAnEventSince: function(timeSince) {
    return this._timeUtil.timePassedSince(this._lastEventTimestamp) > timeSince;
  },

  _isStalledSince: function(timeSince) {
    if (this._didNeverFireAnyEvent()) {
      return true;
    }
    return this._firedAnEventSince(timeSince);
  },

  doWhenStalledForGivenTime: function(timeSince, fn) {
    var self = this;
    setTimeout(function() {
      if (self._isStalledSince(timeSince)) {
        fn();
      }
    }, timeSince);
  }

};

module.exports = DeviceOrientationBehaviorApp;