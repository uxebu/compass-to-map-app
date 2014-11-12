var jQuery = require('jquery');
var util = require('./util');
var ImageRotator = util.ImageRotator;

function onPageLoaded(fn) {
  jQuery(fn);
}

var degreeConverter = {
  fromScrollOffset: function() {
    return document.body.scrollTop % 360;
  },
  fromDeviceOrientationEvent: function() {}
};

var motionListener = {
  onVerticalScrollUpdate: function(fn) {
    jQuery(document).on('scroll', fn);
  },
  onDeviceOrientationUpdate: function(fn) {
    if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', fn);
    }
  }
};

onPageLoaded(function() {
  var imageRotator = new ImageRotator(jQuery('#compassImage'));
  motionListener.onVerticalScrollUpdate(function() {
    imageRotator.update(degreeConverter.fromScrollOffset())
  });
  motionListener.onDeviceOrientationUpdate(function(deviceOrientationEvent) {
    imageRotator.update(degreeConverter.fromDeviceOrientationEvent(deviceOrientationEvent))
  });
});
