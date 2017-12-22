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

  function loadMap() {
    $.ajax({
      method: "GET",
      url: "/"
    }).done(initMap());
  }

  function checkMap(mapid) {
    $.ajax({
      method: 'GET',
      url: '/maps/' + mapid
    })
    //need a filterpoint function
  }

  function checkPoint() {
    $.ajax({
      method: 'GET',
      url: '/points/:id'
    })
    //need a loadpoint function
  }

  function createMap(mapname) {
    $.ajax({
      method: 'POST',
      url: '/maps',
      data: mapname
    })
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
      content: '<h2>Lighthouse Labs</h2>'
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
});
