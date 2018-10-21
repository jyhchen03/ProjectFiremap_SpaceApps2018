var map;
var marker;
var infowindow;
var messagewindow;
var report;
var location;

function initMap() {
  var home = {lat: -34.397, lng: 150.644};
  map = new google.maps.Map(document.getElementById('map'), {
    center: home,
    zoom: 2
  });

  marker = new google.maps.Marker({ //creating permanent marker on map (Santa Paula)
          position: {lat: 34.3542, lng: -119.0503},
          map: map
  });

  marker = new google.maps.Marker({ //creating permanent marker on map (Santa Paula)
          position: {lat: -23.6980, lng: 133.8807},
          map: map
  });

  infowindow = new google.maps.InfoWindow({
    content: document.getElementById('form')
  });

  messagewindow = new google.maps.InfoWindow({
    content: document.getElementById('message')
  });

  google.maps.event.addListener(map, 'click', function(event) {
    marker = new google.maps.Marker({
      position: event.latLng,
      map: map
    });

    location = {lat: event.latLng.lat(), lng: event.latLng.lng()};

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
      form.hidden = false;
    });

  });

  marker = new google.maps.Marker({
    position: location,
    map:map
  });

}

function saveData() {
  var location = escape(document.getElementById('Location').value);
  var type = document.getElementById('type').value;
  var latlng = marker.getPosition();
  var url = 'phpsqlinfo_addrow.php?Location=' + location +
            '&lat=' + latlng.lat() + '&lng=' + latlng.lng() + '&type=' + type;

  downloadUrl(url, function(data, responseCode) {

    if (responseCode == 200 && data.length <= 1) {
      infowindow.close();
      messagewindow.open(map, marker);
    }
  });
}

function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request.responseText, request.status);
    }
  };

  request.open('GET', url, true);
  request.send(null);
}

function doNothing () {
}
