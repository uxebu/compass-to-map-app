var jQuery = require('jquery');

var domUtil = {
  rotate: function(degrees) {
    jQuery('#compassImage').css('transform', 'rotate('+degrees+'deg)');
  },
  onScroll: function(fn) {
    jQuery(document).on('scroll', function() {
      fn({top: document.body.scrollTop});
    });
  },
  onDeviceOrientationChange: function(fn) {
    window.addEventListener('deviceorientation', fn)
  },
  hasDeviceOrientation: function() {
    return 'DeviceOrientationEvent' in window;
  },
  showInputType: function(type) {
    jQuery('#inputType').html(type);
  }
};

module.exports = domUtil;