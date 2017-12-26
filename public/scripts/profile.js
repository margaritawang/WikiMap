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
        var $mapItem = $("<li>").text(mapTitle);

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
        var $mapItem = $("<li>").text(mapTitle);

        $mapItem.data("mapid", mapID);
        $(".favlist").append($mapItem);
      }
    });
  }
  loadProfile();

})
