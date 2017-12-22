$(document).ready(function() {
  function initMap(){
    //Map options
    var options = {
      zoom:13,
      center: {lat:49.2827,lng:-123.1207}
    }
    //New map
    var map = new google.maps.Map(document.getElementById('map'), options);
  }

  $.ajax({
    method: "GET",
    url: "/api/"
  }).done(function(templateVar) {
    for (var i in templateVar[0]) {
      $mapItem = $('<li>').text(templateVar[0][i].title),
      $mapItem.data('mapid', templateVar[0][i].id)
      $('.maplist').append($mapItem);
    }
    console.log(templateVar[1]);
    for (var i in templateVar[1]) {
      addMarker({coords:
          {lat: templateVar[1][i].latitude,
          lng: templateVar[1][i].longitude},
          content: `<h2>${templateVar[1][i].title}</h2><span>${templateVar[1][i].description}</span>`})
    }
  });

  function makeMap(mapdata) {
    var $mapItem = $('<li>').text(mapdata.name);
    $mapItem.data('mapid', mapdata.id);

    return $mapItem;
  }

function renderMap(maps) {
  $('.maplist').empty();
  for (var i in maps) {
    var $map = makeMap(maps[i]);
    $('.maplist').append($map);
  }
}

  function checkMap(mapid) {
    $.ajax({
      method: 'GET',
      url: '/maps/' + mapid
    })
    //need a filterpoint function
  }

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
      url: '/maps',
      data: mapname
    }).done(function() {
      // renderAlllocs();

      console.log(mapname);
      $('.maplist').append(mapname);
      $('.newmap')[0].reset();
    });
  }

  function createPoint(pointInfo) {
    $.ajax({
      method: 'POST',
      url: '/maps:id/points',
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
      addMarker({coords:event.latLng});
    });
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

    function addMarker(props){
      var marker = new google.maps.Marker({
      position:props.coords,
      map:map

      });

      if(props.content){
        var infoWindow = new google.maps.InfoWindow({
        content:props.content
        });

        marker.addListener('click', function(){
        infoWindow.open(map, marker);
        });
      }
    }

  $('li').on('click', function(event) {
    event.preventDefault();
    checkMap($(this).data().mapid);
  })

  $('.newmap').on('submit', function(event) {
    event.preventDefault();
    console.log($(this).serialize());
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

