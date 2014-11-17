var App = require('./app');
var domUtil = require('./domUtil');
var convert = require('./convert');
var DeviceRotationApp = require('./deviceorientation-behavior-app');
var ScrollApp = require('./scroll-behavior-app');

var deviceRotationApp = new DeviceRotationApp(domUtil, convert);
var scrollApp = new ScrollApp(domUtil, convert);

new App(domUtil, scrollApp, deviceRotationApp).start();