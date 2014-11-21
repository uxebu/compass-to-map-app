import {App} from './app';
import {domUtil} from './domUtil';
import {convert} from './convert';
import {DeviceOrientationBehaviorApp as DeviceRotationApp} from './deviceorientation-behavior-app';
import {timeUtil} from './timeUtil';
import {ScrollBehaviorApp as ScrollApp} from './scroll-behavior-app';

var deviceRotationApp = new DeviceRotationApp(domUtil, convert, timeUtil);
var scrollApp = new ScrollApp(domUtil, convert);

new App(domUtil, scrollApp, deviceRotationApp).start();
