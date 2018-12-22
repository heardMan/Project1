var myNum = 0;
firebase.database().ref().child("posts").on("child_added", function (snapshot) {
    myNum++;

    var name = snapshot.val().userName;
    var phone = snapshot.val().contactInfo;
    var date = snapshot.val().departureDate;
    var postContent = `<div class="row">
    <div class="col s12 m12">
      <div class="card">
        <div class="card-image">
          <img src="https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2016/01/wallpaper-for-facebook-profile-photo.jpg">
          <span class="card-title black-text text-darken-2">`+ name + `</span>`;
    if (isMobileDevice()) {
        postContent += `<a id ="call" href="tel:1${phone}"class="btn-floating halfway-fab waves-effect waves-light red call"><i class="material-icons">call</i></a></div>`;
    } else {
        postContent += `<a id ="call" href="#modal3" date-type = "${phone}" class="btn-floating halfway-fab waves-effect waves-light red call  modal-trigger"><i class="material-icons">call</i></a></div>`
        var number = $("#call").attr("date-type");

        $("#phonenumber").text(number);
    }
    
    postContent += `<div class="card-content">
          <p> Departure Date: `+ date + `</p>
        </div>
      </div>
    </div>
  </div>`;
    var Post = $(postContent);


    $('#newRides').append(Post);
    $('#availableRides').text(myNum);
    console.log("connected");
}, function (errorObject) {
    console.log("error");
});




