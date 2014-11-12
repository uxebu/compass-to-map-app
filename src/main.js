var jQuery = require('jquery');
var scrollDetection = require('./util').scrollDetection;

jQuery(document).on('scroll', function() {
  var angle = (document.body.scrollTop / jQuery(window).height()) * 360;
  scrollDetection.update(angle);
});

