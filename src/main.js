var jQuery = require('jquery');
var util = require('./util');
var ScrollHandler = util.ScrollHandler;
var Image = util.Image;

var image = new Image();
jQuery(document).on('scroll', function() {
  new ScrollHandler(image).update(document.body.scrollTop);
});

