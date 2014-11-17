function App(domUtil, scrollApp, deviceRotationApp) {
  this._domUtil = domUtil;
  this._scrollApp = scrollApp;
  this._deviceRotationApp = deviceRotationApp;
}

App.TYPE_SWITCH_TIMEOUT = 2*1000;

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
    setTimeout(this._doAppSwitchIfNecessary.bind(this), App.TYPE_SWITCH_TIMEOUT);
  },

  _doAppSwitchIfNecessary: function() {
    if (!this._deviceRotationApp.hasReceivedEventLately(App.TYPE_SWITCH_TIMEOUT)) {
      this._deviceRotationApp.stop();
      this._scrollApp.start();
    }
  }
};

module.exports = App;