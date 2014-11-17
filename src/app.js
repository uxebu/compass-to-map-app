function App(domUtil, scrollApp, deviceRotationApp) {
  this._domUtil = domUtil;
  this._scrollApp = scrollApp;
  this._deviceRotationApp = deviceRotationApp;
}

App.prototype = {
  start: function() {
    this._domUtil.onPageLoaded(this._connectEvents.bind(this));
  },

  _connectEvents: function() {
    if (this._domUtil.hasDeviceOrientation()) {
      this._deviceRotationApp.start();
    } else {
      this._scrollApp.start();
    }
  }
};

module.exports = App;