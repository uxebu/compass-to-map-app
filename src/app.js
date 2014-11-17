var ScrollBehaviorApp = require('./scroll-behavior-app');
var DeviceOrientationBehaviorApp = require('./deviceorientation-behavior-app');

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
      new DeviceOrientationBehaviorApp(this._domUtil, this._convert).start();
    } else {
      this._hookUpScroll();
    }
  },

  _hookUpScroll: function() {
    new ScrollBehaviorApp(this._domUtil, this._convert).start();
  }
};

module.exports = App;