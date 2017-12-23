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

    marker.addListener('click', function(){
      infoWindow.open(map, marker);
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

function initMap() {
  //Map options
  var options = {
    zoom:13,
    center: {lat:49.2827,lng:-123.1207}
  }
  //New map
  map = new google.maps.Map(document.getElementById('map'), options);



  addMarker({
    coords:{lat:49.2819, lng:-123.1083},
    content: '<h4>Lighthouse Labs</h4> <p>Coding bootcamp for dummies</p>'
  });

}
