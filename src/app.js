function App(domUtil, convert) {
  this._domUtil = domUtil;
  this._convert = convert;
}

App.INPUT_TYPE_COMPASS = 'Compass';
App.DEVICEORIENTAION_TIMEOUT = 10*1000;

App.prototype = {
  start: function() {
    this._domUtil.onPageLoaded(this._connectEvents.bind(this));
    setTimeout(this._hookUpScroll.bind(this), App.DEVICEORIENTAION_TIMEOUT);
  },

  _connectEvents: function() {
    if (this._domUtil.hasDeviceOrientation()) {
      this._domUtil.onDeviceOrientationChange(this._rotateByDeviceOrienationEvent.bind(this));
      this._domUtil.showInputType(App.INPUT_TYPE_COMPASS);
    } else {
      this._hookUpScroll();
    }
  },

  _hookUpScroll: function() {
    this._domUtil.onScroll(this._rotateByScrollPosition.bind(this));
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