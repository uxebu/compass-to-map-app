var util = require('./util');
var Image = util.Image;
var ScrollHandler = util.ScrollHandler;

describe('when scrolling', function() {

  var image;
  var scrollHandler;
  beforeEach(function() {
    image = new Image();
    scrollHandler = new ScrollHandler(image);
  });

  it('should update the image rotation', function() {
    spyOn(image, 'rotate');
    scrollHandler.update();
    expect(image.rotate).toHaveBeenCalled();
  });
  it('should rotate 1º for 1 pixel scrolled down', function() {
    spyOn(image, 'rotate');
    scrollHandler.update(1);
    expect(image.rotate).toHaveBeenCalledWith(1);
  });
  it('should rotate 1º for 361 pixel scrolled down', function() {
    spyOn(image, 'rotate');
    scrollHandler.update(361);
    expect(image.rotate).toHaveBeenCalledWith(1);
  });
});
