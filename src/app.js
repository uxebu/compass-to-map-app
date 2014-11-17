var ScrollBehaviorApp = require('./scroll-behavior-app');
var DeviceOrientationBehaviorApp = require('./deviceorientation-behavior-app');

function App(domUtil, convert) {
  this._domUtil = domUtil;
  this._convert = convert;
}

App.prototype = {
  start: function() {
    this._domUtil.onPageLoaded(this._connectEvents.bind(this));
  },

  _connectEvents: function() {
    if (this._domUtil.hasDeviceOrientation()) {
      new DeviceOrientationBehaviorApp(this._domUtil, this._convert).start();
    } else {
      new ScrollBehaviorApp(this._domUtil, this._convert).start();
    }
  }
};

module.exports = App;