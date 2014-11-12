var util = require('./util');
var Image = util.Image;
var ImageRotator = util.ImageRotator;

describe('when scrolling', function() {

  var image;
  var rotator;
  beforeEach(function() {
    image = new Image();
    rotator = new ImageRotator(image);
  });

  it('should update the image rotation', function() {
    spyOn(image, 'rotate');
    rotator.update();
    expect(image.rotate).toHaveBeenCalled();
  });
  it('should rotate 1º for 1 pixel scrolled down', function() {
    spyOn(image, 'rotate');
    rotator.update(1);
    expect(image.rotate).toHaveBeenCalledWith(1);
  });
  it('should rotate 1º for 361 pixel scrolled down', function() {
    spyOn(image, 'rotate');
    rotator.update(361);
    expect(image.rotate).toHaveBeenCalledWith(1);
  });
});
