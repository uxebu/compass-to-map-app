export var convert = {
  scrollPositionToDegrees: function(scrollPosition) {
    return scrollPosition.top / 2;
  },
  deviceOrientationEventToDegrees: function(event) {
    return event.alpha;
  }
};
