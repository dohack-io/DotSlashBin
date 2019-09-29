var max_height = 0;
$(window).ready (function () {
  max_height = $(window).height();
  //$(".trash-content-container").attr("height", max_height + "px")
});

function overlayOn() {
  document.getElementById("overlay").style.display = "block";
  setInterval(function() { overlayOff(); }, 2000);
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
}
