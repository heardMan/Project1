
// Initialize and add the map
var initMap = function (position) {
    if (position) {
        // The location of defaultPos
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude
        var defaultPos = { lat: latitude, lng: longitude };
        // The map, centered at defaultPos
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 4, center: defaultPos });
        // The marker, positioned at defaultPos
        //var marker = new google.maps.Marker({ position: defaultPos, map: map });

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
            position: defaultPos,
            map: map,
            title: 'Sam'
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });


        map.setCenter(marker.position);
    }

}
// Default map to show
// Initialize and add the map
var defaultMap = function () {
    // The location of lax
    var latitude = 34.0522;
    var longitude = -118.2437;
    var lax = { lat: latitude, lng: longitude };
    // The map, centered at lax
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 4, center: lax });
    // The marker, positioned at lax
    var marker = new google.maps.Marker({ position: lax, map: map });
}
$(document).ready(function () {
    defaultMap();
    navigator.geolocation.getCurrentPosition(initMap);
});
