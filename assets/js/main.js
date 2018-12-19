//DEFINE FUNCTIONS
//write post to database
M.AutoInit();
function writeNewPost(name, date, contact, latitude, longitude) {
    //create new child key
    var newPostKey = firebase.database().ref().child('posts').push().key;
    //set post data template
    var postData = {
        postKey: newPostKey,
        userName: name,
        departureDate: date,
        contactInfo: contact,
        lat: latitude,
        lng: longitude
    };
    //create updates object
    var updates = {};
    //set updates object data
    updates['/posts/' + newPostKey] = postData;
    //update and return update object
    return firebase.database().ref().update(updates);
}

function createNewPost() {
    //register on click for new post submit button
    $("#submitNewPost").on("click", function (e) {
        //prevent any default action that may occur
        e.preventDefault();
        //create input value variables to pull data from form
        var postName = $("#newPostName").val();
        var postDate = $("#newPostDate").val();
        var postOrigin = $("#newPostOrigin").val();
        var postContact = $("#newPostPhone").val();
        //retrieve coordinates for origin location if not blank
        $.ajax({
            //call map quest api for coordinates
            url: 'https://www.mapquestapi.com/geocoding/v1/address?key=oJemIAUX2z50LZNB78Pv7gEpOJ6GJ0ZE&inFormat=kvp&outFormat=json&location=' + postOrigin + '&thumbMaps=false',
            type: 'GET',
            dataType: 'json',
            success: function (response) {

                if (!postOrigin) {
                    //set latitude and longitude values if post origin is left blank
                    var latitude = window.localStorage.getItem("userLat");
                    var longitude = window.localStorage.getItem("userLng");
                } else {
                    //set latitude and longitude values from API
                    var latitude = response.results[0].locations[0].latLng.lat;
                    var longitude = response.results[0].locations[0].latLng.lng;

                }
                //write new post to database
                writeNewPost(postName, postDate, postContact, latitude, longitude);
                console.log(latitude);
                console.log(longitude);

            },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
        //clear form inputs
        $("#newPostName").empty();
        $("#newPostDate").empty();
        $("#newPostOrigin").empty();
        $("#newPostPhone").empty();

    })

}
 function nextCarouselSlide(){
     $('#instructions').click(function(){
        $('.carousel.carousel-slider').carousel("next");
     });
 };


//RUN FUNCTIONS
$(document).ready(function () {
    //register Materialize Components with jQuery
    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker();
    $('select').formSelect();
    $('.sidenav').sidenav();
    $('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
        duration: '500'
      });

    

    // register menu-toggle on click -- opens side nav
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $('.sidenav').sidenav("open");
    });

    // register close-menu on click -- closes side nav
    $("#closeMenu").click(function () {
        $('.sidenav').sidenav("close");
    });

    // register new-post on click -- opens form modal
    $(".new-post").click(function () {
        $('#modal1').modal();
        $("#wrapper").toggleClass("toggled");
        $('.sidenav').sidenav("close");
    });

    $("body").on("click", "#phone-button", function () {
        console.log("wellfuck");
        $('#model2').modal();
        $("#wrapper").toggleClass("toggled");
        console.log($(this).attr("value")+"welp");
        $("#phone-number").text($(this).attr("value"));
    });

    // initiate create new posts submit button and logic
    createNewPost();
    nextCarouselSlide();

});