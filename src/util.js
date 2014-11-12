var jQuery = require('jquery');

var image = {
  rotate: function(angle) {
    jQuery('#compassImage').css('webkitTransform', 'rotate(' + (360 - angle) + 'deg)');
  }
};
var scrollDetection = {
  update: function(pixel) {
    var degree = pixel % 360;
    image.rotate(degree);
  }
};

module.exports = {
  image: image,
  scrollDetection: scrollDetection
};