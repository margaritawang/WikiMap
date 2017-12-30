$(document).ready(function() {

  // Load a user's profile page
  function loadProfile() {
    console.log("profile");
    $.ajax({
      url: "/api/profile",
      method: "GET"
    }).done(function(templateVar) {
      console.log(templateVar);

      $(".mymaps").empty();
      $(".favlist").empty();

      for (var i in templateVar[0]) {
        var mapTitle = templateVar[0][i].title;
        var mapID = templateVar[0][i].id;
        var $mapItem = $("<li class='list-group-item'>").text(mapTitle);

        $mapItem.data("mapid", mapID);
        $(".mymaps").append($mapItem);
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

      for (var i in templateVar[2]) {
        var mapTitle = templateVar[2][i].title;
        var mapID = templateVar[2][i].id;
        var $mapItem = $("<li class='list-group-item'>").text(mapTitle);

        $mapItem.data("mapid", mapID);
        $(".favlist").append($mapItem);
      }
    });
  }
  loadProfile();

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


  $('.favlist').on('click', 'li', function(event) {
    event.preventDefault();
    var currentMap = $(this).data().mapid;
    $('#map').data('mapid', currentMap)
    checkMap(currentMap);
  })

  $('.mymaps').on('click', 'li', function(event) {
    event.preventDefault();
    var currentMap = $(this).data().mapid;
    $('#map').data('mapid', currentMap)
    checkMap(currentMap);
  })

})
