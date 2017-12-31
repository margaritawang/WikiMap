var map;
var markers = [];
var infoWindow;

// load a list of available maps with all points on the home page
function loadMap() {
  $.ajax({
    method: "GET",
    url: "/api/"
  }).done(function(templateVar) {
    $(".maplist").empty();

    for (var i in templateVar[0]) {
      var mapTitle = templateVar[0][i].title;
      var mapID = templateVar[0][i].id;
      var $mapItem = $("<li class='list-group-item'>").text(mapTitle);
      var $icon = $('<i>').addClass('icon fa fa-heart fa-1x');

      $icon.data("id",mapID);
      $icon.data("state", false);

      $mapItem.append($icon);
      $mapItem.data("mapid", mapID);
      $(".maplist").append($mapItem);
    }

    for (var i in templateVar[1]) {

      addMarker({
        coords: {
          lat: templateVar[1][i].latitude,
          lng: templateVar[1][i].longitude
        },
        content: `<h2>${templateVar[1][i].title}</h2><p>${
          templateVar[1][i].description
        }</p> <button class='edit' data-id=${templateVar[1][i].id}>Edit</button> <button class='delete' data-id=${templateVar[1][i].id}>Delete</button>`
      });
    }
  });
}

// filter points within a specific map
function filterPoints(points) {
  // console.log(mapid);
  for (var i in points) {
    addMarker({
      coords: {
        lat: points[i].latitude,
        lng: points[i].longitude
      },
      content: `<h2>${points[i].title}</h2><p>${
        points[i].description
      }</p><button class='edit' data-id=${points[i].id}>Edit</button> <button class='delete' data-id=${points[i].id}>Delete</button>`
    });
  }
}

// Check points in a map
function checkMap(mapid) {
  $.ajax({
    method: "GET",
    url: "/api/maps/" + mapid
  }).done(function(data) {
    deleteMarkers();

    if (data.error) {
      return;
    }
    filterPoints(data);
  });
}

// Authenticated uses can create a map
function createMap(mapname) {
  console.log('createmap');
  $.ajax({
    method: "POST",
    url: "/api/maps",
    data: mapname
  }).done(function(id) {

    deleteMarkers();
    var $mapname = $("<li>").text(mapname.split("=").slice(1));
    var $icon = $('<i>').addClass('icon fa fa-heart fa-1x');

      $icon.data("id",id[0]);
      $icon.data("state", false);

      $mapname.append($icon);
    $(".maplist").append($mapname);
    $(".newmap")[0].reset();
    loadMap();
  });
}

//insert a point into the database
function createPoint(mapid, pointInfo) {
  $.ajax({
    method: 'POST',
    url: '/api/maps/' + mapid +'/points',
    data: pointInfo
  }).done(checkMap(mapid));
}

//modify a point changing title or description
function editPoint(pointId, pointInfo) {
  $.ajax({
    method: "POST",
    url: "/api/points/" + pointId,
    data: pointInfo
  }).done(function(data) {
    checkMap(data);
  });
}

//delete a point from database
function deletePoint(pointId) {
  $.ajax({
    method: "POST",
    url: "api/points/" + pointId + "/delete"
  }).done((data) => {
    deleteMarkers();
    checkMap(data);
  })
}

//favorite a map
function likeMap(mapInfo) {
  $.ajax({
    method: "POST",
    url: "/api/like",
    data: mapInfo
  }).done(function(data) {
  });
}


//add a marker on the map
function addMarker(props){
  infoWindow = new google.maps.InfoWindow();
  
  var marker = new google.maps.Marker({
    position: props.coords,
    map: map
  });

  google.maps.event.addListener(marker, 'click', function(){
    infoWindow.setContent(props.content); 
    infoWindow.open(map,this); 
  });
  
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


  google.maps.event.addListener(map, 'dblclick', function(event){

  });


  addMarker({
    coords:{lat:49.2819, lng:-123.1083},
    content: '<h4>Lighthouse Labs</h4> <p>Coding bootcamp for dummies</p>'
  });

}
