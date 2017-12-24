$(document).ready(function() {
  
  // load a list of available maps with all points on the home page
  function loadMap() {
    $.ajax({
      method: "GET",
      url: "/api/"
    }).done(function(templateVar) {
      $('.maplist').empty();
      
      for (var i in templateVar[0]) {
        var mapTitle = templateVar[0][i].title;
        var mapID = templateVar[0][i].id;
        $mapItem = $('<li>').text(mapTitle),
        $mapItem.data('mapid', mapID)
        $('.maplist').append($mapItem);
      }
      
      for (var i in templateVar[1]) {
        addMarker({coords:
          {lat: templateVar[1][i].latitude,
            lng: templateVar[1][i].longitude},
            content: `<h2>${templateVar[1][i].title}</h2><span>${templateVar[1][i].description}</span>`})
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
        coords:
          {lat: points[i].latitude,
          lng: points[i].longitude},
        content: `<h2>${points[i].title}</h2><span>${points[i].description}</span>`
      })
    }
  }
        
  // check points in a map
  function checkMap(mapid) {
    $.ajax({
      method: 'GET',
      url: '/api/maps/' + mapid,
    }).done(function (data) {
      deleteMarkers();
      if (data.error){
        return;
      }
      filterPoints(data);
      // console.log("data",data);
    })
  }
        
  $('.maplist').on('click', 'li', function(event) {
    event.preventDefault();
    currentMap = $(this).data().mapid;
    console.log(currentMap);
    checkMap(currentMap);
  })
    
  function checkPoint(pointid) {
    $.ajax({
      method: 'GET',
      url: '/points/' + pointid
    })
    //need a loadpoint function
  }
  
  function createMap(mapname) {
    $.ajax({
      method: 'POST',
      url: '/api/maps',
      data: mapname
    }).done(function(id) {
      const newID = id[0];
      currentMap = newID;
      deleteMarkers();
      var $mapname = $('<li>').text(mapname.split('=').slice(1));
        $('.maplist').append($mapname);
        $('.newmap')[0].reset();
    });
  }

  function createPoint(pointInfo) {
    $.ajax({
      method: 'POST',
      url: '/api/maps:id/points',
      data: pointInfo
    })
  }

  function editPoint() {
    $.ajax({
      method: 'PUT',
      url: '/points/:id'
    })
  }

  function deletePoint() {
    $.ajax({
      method: 'DELETE',
      url: '/points/:id'
    })
  }

  function likePoint() {
    $.ajax({
      method: 'POST',
      url: '/like',
      data: pointInfo
    })
  }

    //Listen for click on map
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
      console.log('currentMap click event=', currentMap);
      var point = {
        title: title,
        description: description,
        maps_id: currentMap,
        latitude: lat,
        longitude: lng,
        users_id: 1000001
      }
      var infoWindow = new google.maps.InfoWindow({
        content:`<h3>${title}</h3><p>${description}</p>`
      })
      console.log(point);
      createPoint(point);

      //console.log("title:", title);
      //console.log("description:", description);

  });

  google.maps.event.addListener(map, 'dblclick', function(event){

  })
    /*
    var infoWindow = new google.maps.InfoWindow({
      content:'<h1>New Westminster</h1>'
    });

    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
    */

    addMarker({
      coords:{lat:49.2819, lng:-123.1083},
      content: '<h3>Lighthouse Labs</h3> <p>Coding bootcamp for dummies</p>'
      });

    // function addMarker(props){
    //   var marker = new google.maps.Marker({
    //   position:props.coords,
    //   map:map

    //   });

    //   if(props.content){
    //     var infoWindow = new google.maps.InfoWindow({
    //     content:props.content
    //     });

    //     marker.addListener('click', function(){
    //     infoWindow.open(map, marker);
    //     });
    //   }
    // }

  $('li').on('click', function(event) {
    event.preventDefault();
    checkMap($(this).data().mapid);
  })

  $('.newmap').on('submit', function(event) {
    event.preventDefault();
    // console.log($(this).serialize());
    createMap($(this).serialize());
    // $.ajax({
    //   method: "POST",
    //   url: "/maps",
    //   data: $(this).serialize(),
    //   success: (data) => {
    //     console.log("goood");
    //   }
    // })
  })
});

