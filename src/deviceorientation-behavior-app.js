function DeviceOrientationBehaviorApp(domUtil, convert, timeUtil) {
  this._domUtil = domUtil;
  this._convert = convert;
  this._timeUtil = timeUtil;
}

DeviceOrientationBehaviorApp.INPUT_TYPE = 'Compass';

DeviceOrientationBehaviorApp.prototype = {

  _handleRotationFunction: null,
  start: function() {
    this._handleRotationFunction = this._rotateByDeviceOrienationEvent.bind(this);
    this._domUtil.onDeviceOrientationChange(this._handleRotationFunction);
    this._domUtil.showInputType(DeviceOrientationBehaviorApp.INPUT_TYPE);
  },

  stop: function() {
    this._domUtil.offDeviceOrientationChange(this._handleRotationFunction);
  },

  _rotateByDeviceOrienationEvent: function(event) {
    if (event.alpha == null) {
      return;
    }
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