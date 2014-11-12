var jQuery = require('jquery');
var util = require('./util');
var ScrollHandler = util.ScrollHandler;
var Image = util.Image;

var image = new Image();
jQuery(document).on('scroll', function() {
  var angle = (document.body.scrollTop / jQuery(window).height()) * 360;
  new ScrollHandler(image).update(angle);
});

