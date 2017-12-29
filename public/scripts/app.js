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
          content: `<h2>${templateVar[1][i].title}</h2><p>${
            templateVar[1][i].description
          }</p> <button class='edit' data-id=${templateVar[1][i].id}>Edit</button> <button class='delete' data-id=${templateVar[1][i].id}>Delete</button>`
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

  // users can check points on a map when clicking mapname
  $('.maplist').on('click', 'li', function(event) {
    event.preventDefault();
    currentMap = $(this).data().mapid;
    $('#map').data('mapid', currentMap)
    checkMap(currentMap);
  })

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
        // $icon.data("state", false);

        $mapname.append($icon);
      $(".maplist").append($mapname);
      $(".newmap")[0].reset();
      // window.location.reload();
      loadMap();
    });
  }

  function createPoint(mapid, pointInfo) {
    $.ajax({
      method: 'POST',
      url: '/api/maps/' + mapid +'/points',
      data: pointInfo
    }).done(checkMap(mapid));
  }

  // $('#map').on('click', function(event) {
  //   event.preventDefault();
  //   currentMap = $(this).data().mapid;
  //   var pointDetail = addMarkerOnMap(currentMap);
  //   createPoint(currentMap, pointDetail);
  // })

  function editPoint(pointId, pointInfo) {
    $.ajax({
      method: "POST",
      url: "/api/points/" + pointId,
      data: pointInfo
    }).done(function(data) {
      // console.log(data);
      checkMap(data);
    });
  }

  function deletePoint(pointId) {
    $.ajax({
      method: "POST",
      url: "api/points/" + pointId + "/delete"
    }).done((data) => {
      // console.log("data ",data);
      deleteMarkers();
      checkMap(data);
    })
  }

  $('#map').on('click', '.delete', function(event) {
    event.preventDefault();
    deletePoint($(this).data().id);
    // console.log($(this).data().id);
  })

  $('#map').on('click', '.edit', function(event) {
    event.preventDefault();
    var newTitle = prompt("Give a new title for this marker, click enter if no change");
    var newDes = prompt("Give a new description for this marker:");
    var newPoint = {
      title: newTitle,
      description: newDes
    };
    editPoint($(this).data().id, newPoint);
    console.log(newPoint);
  })

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
      alert('Please log in First!');
    // } else if ($(this).data().state === true) {
      // alert('You have already liked this map!');
    } else {
      var userId = $('.login').data().user;
      var mapId = $(this).data().id;
      var mapDetail = {
        users_id:  userId,
        maps_id: mapId
        }
      likeMap(mapDetail);
      $(this).data().state = true;
      console.log($(this).data());
      // console.log(mapDetail);
    }
  })


  //Listen for click on map to create points
  google.maps.event.addListener(map, 'click', function(event){
    if (!$('.login').data().user) {
      alert('Please Log in First!');
    } else if (!currentMap){
      alert('Please Select a Map to Add Your Points!');
    } else {
      var myLatLng = event.latLng;
      var lat = myLatLng.lat();
      var lng = myLatLng.lng();
      var title = prompt("Give a title for your marker:");
      if(!title){
        alert('Please Insert a Title!')
      } else {
        var description = prompt('Now, give us a description:');

        if(!description){
          alert('Please Insert a Description!')
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
        }
      }
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

  // returns to maps with all points
  $('.home').on('click', function() {
    loadMap();
  })

  // Logged in users can create maps
  $(".newmap").on("submit", function(event) {
    event.preventDefault();
    if (!$('.login').data().user) {
      alert('Please log in!');
      $(".newmap")[0].reset();
    } else {
      console.log($(this).serialize());
      createMap($(this).serialize());
    }
  });

})
