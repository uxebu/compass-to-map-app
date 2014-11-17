function App(domUtil, scrollApp, deviceRotationApp) {
  this._domUtil = domUtil;
  this._scrollApp = scrollApp;
  this._deviceRotationApp = deviceRotationApp;
}

App.TYPE_SWITCH_TIMEOUT = 10000;

App.prototype = {
  start: function() {
    this._domUtil.onPageLoaded(this._connectEvents.bind(this));
    this._checkForAppSwitch();
  },

  _connectEvents: function() {
    if (this._domUtil.hasDeviceOrientation()) {
      this._deviceRotationApp.start();
    } else {
      this._scrollApp.start();
    }
  },

  _checkForAppSwitch: function() {
    var deviceRotationApp = this._deviceRotationApp;
    var scrollApp = this._scrollApp;
    setTimeout(function() {
      if (!deviceRotationApp.hasReceivedEventLately(App.TYPE_SWITCH_TIMEOUT)) {
        scrollApp.start();
      }
    }, App.TYPE_SWITCH_TIMEOUT);
  }
};

module.exports = App;