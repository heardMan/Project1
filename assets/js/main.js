///Menu Toggle Script
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
$( "#pull" ).click(function() {
    $('#form').toggleClass('hide');
  });