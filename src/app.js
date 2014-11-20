export class App {

  constructor(domUtil, scrollApp, deviceRotationApp) {
    this._domUtil = domUtil;
    this._scrollApp = scrollApp;
    this._deviceRotationApp = deviceRotationApp;
  }

  start() {
    this._domUtil.onPageLoaded(this._startApp.bind(this));
  }

  _startApp() {
    if (this._domUtil.hasDeviceOrientation()) {
      this._startDeviceOrientationApp();
    } else {
      this._scrollApp.start();
    }
  }

  _startDeviceOrientationApp() {
    this._deviceRotationApp.start();
    this._deviceRotationApp.doWhenStalledForGivenTime(App.APP_WATCHER_TIMEOUT, this._switchToScrollApp.bind(this));
  }

  _switchToScrollApp() {
    this._deviceRotationApp.stop();
    this._scrollApp.start();
  }

}
App.APP_WATCHER_TIMEOUT = 2*1000;