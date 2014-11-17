var domUtil = {
  rotate: function() {}
};
function emulateDocumentScrollEvent(degrees) {
  domUtil.rotate(degrees);
}

describe('rotate on an event', function() {
  it('should be triggered on scroll', function() {
    var degrees = 42;
    spyOn(domUtil, 'rotate');
    emulateDocumentScrollEvent(degrees);
    expect(domUtil.rotate).toHaveBeenCalledWith(degrees);
  });
});