function ScrollBehaviorApp(domUtil, convert) {
  this._domUtil = domUtil;
  this._convert = convert;
}

ScrollBehaviorApp.INPUT_TYPE = 'Scroll';

ScrollBehaviorApp.prototype = {

  start: function() {
    this._domUtil.onScroll(this._rotateByScrollPosition.bind(this));
    this._domUtil.showInputType(ScrollBehaviorApp.INPUT_TYPE);
  },

  _rotateByScrollPosition: function(scrollPos) {
    this._rotateByDegrees(this._convert.scrollPositionToDegrees(scrollPos));
  },

  _rotateByDegrees: function(degrees) {
    this._domUtil.rotate(degrees);
  }
};

module.exports = ScrollBehaviorApp;