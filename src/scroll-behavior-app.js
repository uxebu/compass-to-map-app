export class ScrollBehaviorApp {
  constructor(domUtil, convert) {
    this._domUtil = domUtil;
    this._convert = convert;
  }

  start() {
    this._domUtil.onScroll(this._rotateByScrollPosition.bind(this));
    this._domUtil.showInputType(ScrollBehaviorApp.INPUT_TYPE);
  }

  _rotateByScrollPosition(scrollPos) {
    this._rotateByDegrees(this._convert.scrollPositionToDegrees(scrollPos));
  }

  _rotateByDegrees(degrees) {
    this._domUtil.rotate(degrees);
  }
}
ScrollBehaviorApp.INPUT_TYPE = 'Scroll';
