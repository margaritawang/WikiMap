$(document).ready(function() {
  
  loadMap();

  var currentMap;

  // users can check points on a map when clicking mapname
  $('.maplist').on('click', 'li', function(event) {
    event.preventDefault();
    currentMap = $(this).data().mapid;
    $('#map').data('mapid', currentMap)
    checkMap(currentMap);
  })

  $('#map').on('click', '.delete', function(event) {
    event.preventDefault();
    if (!$('.login').data().user) {
      alert('Please Log in First!');
    } else {
      deletePoint($(this).data().id);
    }
  })

  $('#map').on('click', '.edit', function(event) {
    event.preventDefault();
    if (!$('.login').data().user) {
      alert('Please Log in First!');
    } else {
      var newTitle = prompt("Give a new title for this marker, click enter if no change");
      var newDes = prompt("Give a new description for this marker:");
      var newPoint = {
        title: newTitle,
        description: newDes
      };
      editPoint($(this).data().id, newPoint);
      console.log(newPoint);
    }
  })

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
      // $(this).data().state = true;
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
      var userId = $('.login').data().user;
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
            users_id: userId,
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
