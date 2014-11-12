var image = {
  rotate: function() {}
};
var scrollDetection = {
  onUpdate: function(pixel) {
    var degree = pixel % 360;
    image.rotate(degree);
  }
};

module.exports = {
  image: image,
  scrollDetection: scrollDetection
};