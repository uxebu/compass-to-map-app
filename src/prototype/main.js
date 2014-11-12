var jQuery = require('jquery');

var imageEl;
jQuery(function() {
  imageEl = jQuery('#compassImage');
});

jQuery(document).on('scroll', function() {
  var angle = (document.body.scrollTop / jQuery(window).height()) * 360;
  imageEl.css('webkitTransform', 'rotate(' + (360 - angle) + 'deg)');

  var direction = {
    0: 'North',
    23: 'North North East',
    45: 'North East',
    68: 'East North East',
    90: 'East',
    113: 'East South East',
    135: 'South East',
    158: 'South South East',
    180: 'South',
    203: 'South South West',
    225: 'South West',
    248: 'West South West',
    270: 'West',
    293: 'West North West',
    315: 'North West',
    338: 'North North West'
  };

  var angleFloored = Math.floor(angle);
  var text = angleFloored % 360 + 'º ';
  if (direction[angleFloored]) {
    text = direction[angleFloored % 360];
  }
  //jQuery('#directionHeading').text(text);


  window.addEventListener('deviceorientation', function(event) {
  //  jQuery('#directionHeading').text('deg: ' + compassHeading(event.alpha, event.beta, event.gamma));
  //});

    angle = compassHeading(event.alpha, event.beta, event.gamma);
    var rotation = Math.PI * 2 * angle / 360;
    map.beforeRender(function(map) {
      map.getView().setRotation(rotation);
    });
  });
});

var map;
var ol = require('planet-maps');
jQuery(function() {
  map = new ol.Map({
    layers: [
      new ol.layer.Tile({source: new ol.source.OSM()})
    ],
    view: new ol.View({
      center: ol.proj.transform([47.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
      zoom: 6
    }),
    target: 'map'
  });
});

var degtorad = Math.PI / 180; // Degree-to-Radian conversion

function compassHeading(alpha, beta, gamma) {

  var _x = beta ? beta * degtorad : 0; // beta value
  var _y = gamma ? gamma * degtorad : 0; // gamma value
  var _z = alpha ? alpha * degtorad : 0; // alpha value

  var cX = Math.cos(_x);
  var cY = Math.cos(_y);
  var cZ = Math.cos(_z);
  var sX = Math.sin(_x);
  var sY = Math.sin(_y);
  var sZ = Math.sin(_z);

  // Calculate Vx and Vy components
  var Vx = -cZ * sY - sZ * sX * cY;
  var Vy = -sZ * sY + cZ * sX * cY;

  // Calculate compass heading
  var compassHeading = Math.atan(Vx / Vy);

  // Convert compass heading to use whole unit circle
  if (Vy < 0) {
    compassHeading += Math.PI;
  } else if (Vx < 0) {
    compassHeading += 2 * Math.PI;
  }

  return compassHeading * ( 180 / Math.PI ); // Compass Heading (in degrees)
}

