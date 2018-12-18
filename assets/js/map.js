// DEFINE FUNCTIONS

//create a Map
var initMap = function (position) {
    //set coordinates for LAX map marker
    var lax = { lat: 34.0522, lng: -118.2437 };
    //handle GPS coordinates from geolocation function if they exist
    if (position) {
        //assign user ltaitude and longitude to variables
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        //set coordinates for user position
        var userPosition = { lat: latitude, lng: longitude };
        //create new google Map and set center to user's location
        var map = new google.maps.Map(document.getElementById('map'), { zoom: 10, center: userPosition });
        // creat a new marker indicating the the users location
        newMarker(userPosition, map, "You are Here");
        //write user Latitude to local storage
        window.localStorage.setItem("userLat", latitude);
        // write user Longitude to local storage
        window.localStorage.setItem("userLng", longitude);
    } else {
        //create new google Map and set center to LAX's location
        var map = new google.maps.Map(document.getElementById('map'), { zoom: 10, center: lax });
    }
    // add LAX marker
    newMarker(lax, map, "LAX Here");
    // add markers for posts in the database
    addPostsToMap(map);
    return map;
}

function newMarker(pos, map, post) {
    //create and set infowindow Content
    //var infowindow = new google.maps.InfoWindow({content});
    console.log(`WABOOOO ${post.userName}`);
    var contentString = `<div class="card horizontal">
        <div class="card-image">
        <img src="https://lorempixel.com/100/190/nature/6">
        </div>
        <div class="card-stacked"> <div class="card-content"> <h4 class="header">${post.userName}</h4> <p>I am departing on ${post.departureDate} for LAX!!</p> </div>
        <div class="card-action">
        <a href="tel:1${post.contactInfo}">Call Me</a> </div></div></div>`;
    //create and set marker
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: pos,
        map: map,
    });
    //add click listener for each marker
    marker.addListener('click', function () {
        //add infowindow to marker
        infowindow.open(map, marker);
    });
}

function addPostsToMap(map) {
    //open database connection
    firebase.database().ref().child("posts").on("child_added", function (snapshot) {
        var post = snapshot.val();
        //convert coordinate from string to float
        var latitude = parseFloat(post.lat);
        //convert coordinate from string to float
        var longitude = parseFloat(post.lng);
        // create position object
        var position = { lat: latitude, lng: longitude };
        // set marker content
        //var content = "<div><p>Name: " + post.userName + "</p><p>Date: " + post.departureDate + "</p><p>Contact: " + post.contactInfo + "</p></div>";
        //create marker and add to map
        newMarker(position, map, post);
    });

}

//RUN FUNCTIONS
$(document).ready(function () {
    //display default map
    initMap();
    //display map centered ate user's location
    navigator.geolocation.getCurrentPosition(initMap);


});
    