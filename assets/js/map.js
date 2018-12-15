 // Initialize and add the map
 function initMap(position) {
    // The location of Uluru
    var latitude = position.coords.latitude 
    var longitude = position.coords.longitude
    var uluru = {lat: latitude, lng: longitude};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
  }

  navigator.geolocation.getCurrentPosition(initMap);
  