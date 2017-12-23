var map;
var markers = [];

function addMarker(props){
  var marker = new google.maps.Marker({
    position: props.coords,
    map: map
  });

  if(props.content){
    var infoWindow = new google.maps.InfoWindow({
      content:props.content
    });  
  }
  markers.push(marker);
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function addMarkerOnMap(mapid) {

    google.maps.event.addListener(map, 'click', function(event){
      var myLatLng = event.latLng;
      var lat = myLatLng.lat();
      var lng = myLatLng.lng();
      var title = prompt("Give a title for your marker:");
      if(title != null){
        var description = prompt('Now, give us a description:');
        if(description != null){
          addMarker({coords: myLatLng});
        }
      }
      var point = {
        title: title,
        description: description,
        maps_id: mapid,
        latitude: lat,
        longitude: lng,
        users_id: 1000001
      }
      var infoWindow = new google.maps.InfoWindow({
        content:`<h3>${title}</h3><p>${description}</p>`
      })
      console.log(point);
      return point;
    });

}

function initMap() {
  //Map options
  var options = {
    zoom:13,
    center: {lat:49.2827,lng:-123.1207}
  }
  //New map
  map = new google.maps.Map(document.getElementById('map'), options);

}
