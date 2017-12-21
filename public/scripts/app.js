$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(initMap());
    
    
    function initMap(){
      //Map options
      var options = {
        zoom:13,
        center: {lat:49.2827,lng:-123.1207}
      } 
      //New map
      var map = new google.maps.Map(document.getElementById('map'), options);

      //Listen for click on map
      google.maps.event.addListener(map, 'click', function(event){
        
        addMarker({coords:event.latLng});
      });

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
    }
  });;
});
