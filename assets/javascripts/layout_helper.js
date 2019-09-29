var max_height = 0;
$(window).ready (function () {
  max_height = $(window).height();
  //$(".trash-content-container").attr("height", max_height + "px")
});

function overlayOn() {
  $('#overlay').fadeIn();

  setInterval(function() { overlayOff(); }, 1500);

}

function overlayOff() {
  $('#overlay').fadeOut();

}
