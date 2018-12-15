function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.712, lng: -74.005 },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            //   infoWindow.setPosition(pos);
            //   infoWindow.setContent('Location found.');
            //   infoWindow.open(map);
            //   map.setCenter(pos);


            var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">Sam</h1>' +
                '<div id="bodyContent">' +
                '<p><b>To LAX</b>, I need a ride!!!!!.</p>' +
                '<button>Call Me</button>'
            '</div>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Sam'
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });


            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}