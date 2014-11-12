
function ImageRotator(image) {
  this.image = image;
}
ImageRotator.prototype = {
  update: function(angle) {
    this.image.css('webkitTransform', 'rotate(' + angle + 'deg)');
  }
};

module.exports = {
  ImageRotator: ImageRotator
};