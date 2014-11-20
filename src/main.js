import {App} from './app'
import {domUtil} from './domUtil';
var convert = require('./convert');
var DeviceRotationApp = require('./deviceorientation-behavior-app');
var timeUtil = require('./timeUtil');
import {ScrollBehaviorApp as ScrollApp} from './scroll-behavior-app'

var deviceRotationApp = new DeviceRotationApp(domUtil, convert, timeUtil);
var scrollApp = new ScrollApp(domUtil, convert);

new App(domUtil, scrollApp, deviceRotationApp).start();
