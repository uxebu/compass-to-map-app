var AppWatcher = require('./app-watcher');

function App(domUtil, scrollApp, deviceRotationApp) {
  this._domUtil = domUtil;
  this._scrollApp = scrollApp;
  this._deviceRotationApp = deviceRotationApp;
}

App.TYPE_SWITCH_TIMEOUT = 2*1000;

App.prototype = {
  start: function() {
    this._domUtil.onPageLoaded(this._connectEvents.bind(this));
  },

  _connectEvents: function() {
    if (this._domUtil.hasDeviceOrientation()) {
      this._startDeviceOrientationApp();
    } else {
      this._scrollApp.start();
    }
  },

  _startDeviceOrientationApp: function() {
    this._deviceRotationApp.start();
    var watcher = new AppWatcher(this._deviceRotationApp, App.TYPE_SWITCH_TIMEOUT);
    watcher.whenItStalls(this._switchToScrollApp.bind(this));
  },

  _switchToScrollApp: function() {
    this._deviceRotationApp.stop();
    this._scrollApp.start();
  }

};

module.exports = App;