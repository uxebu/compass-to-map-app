var App = require('./app');
var domUtil = require('./domUtil');
var convert = require('./convert');

new App(domUtil, convert).start();