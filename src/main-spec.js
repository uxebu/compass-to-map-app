var main = require('./main');
var image = main.image;
var scrollDetection = main.scrollDetection;

describe('when scrolling', function() {
  it('should update the image rotation', function() {
    spyOn(image, 'rotate');
    scrollDetection.onUpdate();
    expect(image.rotate).toHaveBeenCalled();
  });
  it('should rotate 1º for 1 pixel scrolled down', function() {
    spyOn(image, 'rotate');
    scrollDetection.onUpdate(1);
    expect(image.rotate).toHaveBeenCalledWith(1);
  });
  it('should rotate 1º for 361 pixel scrolled down', function() {
    spyOn(image, 'rotate');
    scrollDetection.onUpdate(361);
    expect(image.rotate).toHaveBeenCalledWith(1);
  });
});