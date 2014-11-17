function App(domUtil, convert) {
  this._domUtil = domUtil;
  this._convert = convert;
}

App.prototype = {
  start: function() {
    if (this._domUtil.hasDeviceOrientation()) {
      this._domUtil.onDeviceOrientationChange(this._rotateByDeviceOrienationEvent.bind(this));
    } else {
      this._domUtil.onScroll(this._rotateByScrollPosition.bind(this));
    }
  },

  _rotateByScrollPosition: function(scrollPos) {
    this._rotateByDegrees(this._convert.scrollPositionToDegrees(scrollPos));
  },

  _rotateByDeviceOrienationEvent: function(event) {
    this._rotateByDegrees(this._convert.deviceOrientationEventToDegrees(event));
  },

  _rotateByDegrees: function(degrees) {
    this._domUtil.rotate(degrees);
  }
};

module.exports = App;