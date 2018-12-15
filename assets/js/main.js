///Menu Toggle Script
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$("#pull").click(function () {
    $('#form').toggleClass('hide');
});

function writeNewPost(name, date, contact) {
    var newPostKey = firebase.database().ref().child('posts').push().key;

    var postData = {
        postKey: newPostKey,
        userName: name,
        departureDate: date,
        contactInfo: contact,
    };
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    return firebase.database().ref().update(updates);
}

function createNewPost() {
    $("#submitNewPost").on("click", function (e) {
        e.preventDefault();
        var postName = $("#newPostName").val();
        var postDate = $("#newPostDate").val();
        //var postOrigin = $("#origin").val();
        var postContact = $("#newPostPhone").val();
        writeNewPost(postName, postDate, postContact);
        $("#newPostName").val("");
        $("#newPostDate").val("");
        //$("#origin").val("");
        $("#newPostPhone").val("");

    })

}
createNewPost();