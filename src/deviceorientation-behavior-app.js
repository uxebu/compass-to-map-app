export class DeviceOrientationBehaviorApp {
  
  constructor(domUtil, convert, timeUtil) {
    this._handleRotationFunction = null;
    this._lastEventTimestamp = null;
    this._domUtil = domUtil;
    this._convert = convert;
    this._timeUtil = timeUtil;
  }

  start() {
    this._handleRotationFunction = this._rotateByDeviceOrienationEvent.bind(this);
    this._domUtil.onDeviceOrientationChange(this._handleRotationFunction);
    this._domUtil.showInputType(DeviceOrientationBehaviorApp.INPUT_TYPE);
  }

  stop() {
    this._domUtil.offDeviceOrientationChange(this._handleRotationFunction);
  }

  _rotateByDeviceOrienationEvent(event) {
    if (event.alpha == null) {
      return;
    }
    this._lastEventTimestamp = new Date();
    this._rotateByDegrees(this._convert.deviceOrientationEventToDegrees(event));
  }

  _rotateByDegrees(degrees) {
    this._domUtil.rotate(degrees);
  }

  _didNeverFireAnyEvent() {
    return this._lastEventTimestamp == null;
  }

  _firedAnEventSince(timeSince) {
    return this._timeUtil.timePassedSince(this._lastEventTimestamp) > timeSince;
  }

  _isStalledSince(timeSince) {
    if (this._didNeverFireAnyEvent()) {
      return true;
    }
    return this._firedAnEventSince(timeSince);
  }

  doWhenStalledForGivenTime(timeSince, fn) {
    setTimeout(() => {
      if (this._isStalledSince(timeSince)) {
        fn();
      }
    }, timeSince);
  }

}
DeviceOrientationBehaviorApp.INPUT_TYPE = 'Compass';
