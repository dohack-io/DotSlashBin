// Variables
var trashId = 0;
// Map Marker : binId
var markerMap = new Map();
var trashes;
var currentTrashes;
var homeLocation;

var url_bin_empty = {url: "https://trashhero.camefrom.space/marker-empty.png"};
var url_bin_full = {url: "https://trashhero.camefrom.space/marker-full.png"};

var binName  = ["Recyclable Waste Bin", "Paper Waste", "Bio Waste", "Non Recyclable Waste", "Glass Waste Bin"];

var clickSet = new Set();

// Location

function addTrashLocation (pos, binId) {
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: pos, map: map});
  if (binIsEmpty(binId)){
    marker.setIcon(url_bin_empty);
  } else {
    marker.setIcon(url_bin_full);
  }
  markerMap.set(marker, binId);
  marker.addListener('click', function(){
    resetTrashesInControl()

    var binID = markerMap.get(marker);
    console.log(binID);
    var tmpCans = trashes[binID - 1].cans;
    currentTrashes = tmpCans;


    for (var i = 0; i < tmpCans.length; i++) {
      var can = tmpCans[i];
      console.log(can);
      addTrashToControl(can.amount, binName[i]);
    }

    event.preventDefault();
    // Getting the height of the document
    var n = $(document).height();
    $('html, body').animate({ scrollTop: n }, 700);
  });
}


// Controll function
function resetTrashesInControl () {
  trashId = 0;
  $("#trash-btn-collection").empty();
  var tmpBtn = $("#reportBtn");
  tmpBtn.removeClass("btn-success");
  tmpBtn.addClass("btn-primary");
  tmpBtn.text("REPORT");

  clickSet.clear();
}


function updateTrashes() {
  api.getItems("trashcans")
      .then(data => {
        trashes = data.data
        updateTrashOnTheMap();
      }).catch(error => console.error(error));
}

function updateTrashOnTheMap(){
  clearOverlays();
  trashes.forEach(function(tmp) {
    var bId = tmp.id;
    var bPos = {lat: tmp.position.lat, lng: tmp.position.lon};
    addTrashLocation(bPos, bId);
    //console.log("Pos:" +  bPos + " id: " + bId);
  });
  homeLocation = new google.maps.Marker({position: {lat: 51.5046, lng: 7.5263}, map: map});
}


// Help function
function addRow(row){
  var tmpSection = $("#trash-btn-collection");
    tmpSection.append(
    '<div class="row">'+
      '<div class="col-6 invisible" id="bin' + (row*2) +'">'+
        '<button type="button" name="button" class="btn btn-outline-success trash-btn-post conHeight" onclick="addToSet('+ (row*2) +')" id="btnMain' + (row*2) +'">' +
          '<div>' +
            '<div class="text-center">'+
              '<img src="assets/img/icons/bin.svg" alt="">'+
              '<p id="amount_' + (row*2) +'">x</p>'+
            '</div>'+
            '<div class="row">'+
              '<div class="w-100"></div>'+
              '<div class="col" id="binLabel' + (row*2) + '"></div>'+
            '</div>'+
          '</div>'+
        '</button>'+
      '</div>'+
      '<div class="col-6 invisible" id="bin' + ((row*2) + 1) +'">'+
        '<button type="button" name="button" class="btn btn-outline-success trash-btn-post conHeight" onclick="addToSet('+ ((row*2) + 1) +')" id="btnMain' + ((row*2) + 1) +'">'+
          '<div>'+
            '<div class="text-center">'+
              '<img src="assets/img/icons/bin.svg" alt="">'+
              '<p id="amount_' + ((row*2) + 1) +'">x</p>'+
            '</div>'+
            '<div class="row">'+
              '<div class="w-100"></div>'+
              '<div class="col" id="binLabel' + ((row*2) + 1) +'"></div>'+
            '</div>'+
          '</div>'+
        '</button>'+
      '</div>'+
    '</div>');
}

function addTrashToControl(trashAmount, trashName) {
  if ((trashId%2) == 0) {
    addRow(trashId / 2);
  }
  $("#bin"+ trashId).removeClass("invisible");
  $("#amount_"+ trashId).append(trashAmount);
  if (trashAmount == 0){
    $("#btnMain"+ trashId).removeClass("btn-outline-success");
    $("#btnMain"+ trashId).addClass("btn-outline-danger");
  }
  $("#binLabel"+ trashId++).append(trashName);
}

function binIsEmpty(binId) {
  var tmp = trashes[binId - 1];
  var tmpCans = tmp.cans;
  for (var value of tmpCans) {
    //console.log("Full: " + value);
    if (value.full){return false}
  }
  return true;
}

function addToSet(id){
  console.log("Buttonid: " + id);
  clickSet.add(id);
}

function reportClick() {
  console.log("Report Click");
    var tmpBtn = $("#reportBtn");
    tmpBtn.removeClass("btn-primary");
    tmpBtn.addClass("btn-success");
    tmpBtn.text("Thank you for Report 👍");
    overlayOn();

}


function updateTrashData(){
  console.log(currentTrashes);
  for (var i in clickSet) {
    currentTrashes[i].full = true;
  }
  updateTrashOnTheMap();

  resetTrashesInControl()
  var tmpCans = currentTrashes;


  for (var i = 0; i < tmpCans.length; i++) {
    var can = tmpCans[i];
    console.log(can);
    addTrashToControl(can.amount, binName[i]);
  }

}


function clearOverlays() {
  for (marker in markerMap) {
    marker.setMap(null);
  }
  //homeLocation.setMap(null);
}




// Test
$(document).ready (function () {
  // addTrashToControl(1, "Wertstoffe");
  // addTrashToControl(2, "Altpapier");
  // addTrashToControl(3, "Restabfall");
  // addTrashToControl(4, "Bioabfall");
  // addTrashToControl(5, "Altglass");

  resetTrashesInControl();
  updateTrashes();

});
