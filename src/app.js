function App(domUtil, convert) {
  this._domUtil = domUtil;
  this._convert = convert;
}
App.prototype = {
  start: function() {
    var convert = this._convert;
    var self = this;
    this._domUtil.onScroll(function(scrollPos) {
      self._rotateByDegrees(convert.scrollPositionToDegrees(scrollPos));
    });
    this._domUtil.onDeviceOrientationChange(function(event) {
      self._rotateByDegrees(convert.deviceOrientationEventToDegrees(event));
    });
  },

  _rotateByDegrees: function(degrees) {
    this._domUtil.rotate(degrees);
  }
};

module.exports = App;