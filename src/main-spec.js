var util = require('./util');
var image = util.image;
var scrollDetection = util.scrollDetection;

describe('when scrolling', function() {
  it('should update the image rotation', function() {
    spyOn(image, 'rotate');
    scrollDetection.update();
    expect(image.rotate).toHaveBeenCalled();
  });
  it('should rotate 1º for 1 pixel scrolled down', function() {
    spyOn(image, 'rotate');
    scrollDetection.update(1);
    expect(image.rotate).toHaveBeenCalledWith(1);
  });
  it('should rotate 1º for 361 pixel scrolled down', function() {
    spyOn(image, 'rotate');
    scrollDetection.update(361);
    expect(image.rotate).toHaveBeenCalledWith(1);
  });
});