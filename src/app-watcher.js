function AppWatcher(app, timeout) {
  this._app = app;
  this._timeout = timeout;
}
AppWatcher.prototype = {
  whenItStalls: function(fn) {
    setTimeout(this._checkForStallingApp.bind(this, fn), this._timeout);
  },

  _checkForStallingApp: function(fn) {
    if (!this._app.hasReceivedEventLately(this._timeout)) {
      fn();
    }
  }

};

module.exports = AppWatcher;