import jQuery from 'jquery';

export var domUtil = {
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
  offDeviceOrientationChange: function(fn) {
    window.removeEventListener('deviceorientation', fn)
  },
  hasDeviceOrientation: function() {
    return 'DeviceOrientationEvent' in window;
  },
  showInputType: function(type) {
    jQuery('#inputType').html(type);
  },
  onPageLoaded: function(fn) {
    jQuery(fn);
  }
};