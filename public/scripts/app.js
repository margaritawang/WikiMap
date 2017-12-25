$(document).ready(function() {
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
        var $mapItem = $("<li>").text(mapTitle);
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
          content: `<h2>${templateVar[1][i].title}</h2><span>${
            templateVar[1][i].description
          }</span>`
        });
      }
    });
  }

  loadMap();

  var currentUser;
  var currentMap;

  // filter points within a specific map
  function filterPoints(points) {
    // console.log(mapid);
    for (var i in points) {
      addMarker({
        coords: {
          lat: points[i].latitude,
          lng: points[i].longitude
        },
        content: `<h2>${points[i].title}</h2><span>${
          points[i].description
        }</span>`
      });
    }
  }

  // check points in a map
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
      // console.log("data",data);
    });
  }

  // users can check points on a map when clicking mapname
  $('.maplist').on('click', 'li', function(event) {
    event.preventDefault();
    currentMap = $(this).data().mapid;
    $('#map').data('mapid', currentMap)
    checkMap(currentMap);
  })



  function checkPoint(pointid) {
    $.ajax({
      method: "GET",
      url: "/points/" + pointid
    });
    //need a loadpoint function
  }

  function createMap(mapname) {
    $.ajax({
      method: "POST",
      url: "/api/maps",
      data: mapname
    }).done(function(id) {
      const newID = id[0];
      currentMap = newID;
      deleteMarkers();
      var $mapname = $("<li>").text(mapname.split("=").slice(1));
      $(".maplist").append($mapname);
      $(".newmap")[0].reset();
    });
  }

  function createPoint(mapid, pointInfo) {
    $.ajax({
      method: 'POST',
      url: '/api/maps/' + mapid +'/points',
      data: pointInfo
    });
  }

  // $('#map').on('click', function(event) {
  //   event.preventDefault();
  //   currentMap = $(this).data().mapid;
  //   var pointDetail = addMarkerOnMap(currentMap);
  //   createPoint(currentMap, pointDetail);
  // })

  function editPoint() {
    $.ajax({
      method: "PUT",
      url: "/api/points/:id"
    });
  }

  function deletePoint() {
    $.ajax({
      method: "DELETE",
      url: "/points/:id"
    });
  }

  function likeMap(mapInfo) {
    $.ajax({
      method: "POST",
      url: "/api/like",
      data: mapInfo
    });
  }

  // users can favorite a map when clicking the heart icon
  $('.maplist').on('click', 'i', function(event) {
    event.preventDefault();
    if (!$('.login').data().user) {
      alert('Please log in!');
    } else {

      var userId = $('.login').data().user;
      var mapId = $(this).data().id;
      var mapDetail = {
        users_id:  userId,
        maps_id: mapId
      }

      likeMap(mapDetail);
      console.log(mapDetail);
    }
  })
    //Listen for click on map to create points

    google.maps.event.addListener(map, 'click', function(event){
      if (!$('.login').data().user) {
        alert('please log in!');
      }
      else {
        var myLatLng = event.latLng;
        var lat = myLatLng.lat();
        var lng = myLatLng.lng();
        var title = prompt("Give a title for your marker:");
        if(!title){
          alert('please insert a title!')
        } else {
          var description = prompt('Now, give us a description:');

          if(!description){
            alert('Please insert a description!')
          } else {
            addMarker({coords: myLatLng});
            var point = {
              title: title,
              description: description,
              longitude: lng,
              latitude: lat,
              users_id: 1000001,
              maps_id: currentMap
            }

            var infoWindow = new google.maps.InfoWindow({
              content:`<h3>${title}</h3><p>${description}</p>`
            })
            console.log(point);
            createPoint(currentMap,point);
            checkMap(currentMap);
          }
        }
        // console.log('currentMap click event=', currentMap);
      }

      // console.log("title:", title);
      // console.log("description:", description);

  });

  google.maps.event.addListener(map, 'dblclick', function(event){

  })



  addMarker({
    coords: { lat: 49.2819, lng: -123.1083 },
    content: "<h3>Lighthouse Labs</h3> <p>Coding bootcamp for dummies</p>"
  });

  // Logged in users can create maps
  $(".newmap").on("submit", function(event) {
    event.preventDefault();
    if (!$('.login').data().user) {
      alert('please log in!');
      $(".newmap")[0].reset();
    } else {
      createMap($(this).serialize());
    }
  });
});
