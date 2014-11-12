var jQuery = require('jquery');

function Image() {}
Image.prototype = {
  rotate: function(angle) {
    jQuery('#compassImage').css('webkitTransform', 'rotate(' + (360 - angle) + 'deg)');
  }
};

function ScrollHandler(image) {
  this.image = image;
}
ScrollHandler.prototype = {
  update: function(pixels) {
    var degree = pixels % 360;
    this.image.rotate(degree);
  }
};

module.exports = {
  Image: Image,
  ScrollHandler: ScrollHandler
};