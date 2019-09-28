// Variables
var trashId = 0;
// Map Marker : binId
var markerMap = new Map();



// Location

function addTrashLocation (pos, binId) {
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: pos, map: map});
  markerMap.set(marker, binId);
}


// Controll function
function resetTrashes () {
  trashId = 0;
  $("#trash-btn-collection").empty()
}


function addTrashes (trashes) {
}


// Help function
function addRow(row){
  var tmpSection = $("#trash-btn-collection");
    tmpSection.append(
    '<div class="row">'+
      '<div class="col-6 invisible" id="bin' + (row*2) +'">'+
        '<button type="button" name="button" class="btn btn-outline-primary trash-btn-post">' +
          '<div>' +
            '<div class="text-center">'+
              '<img src="assets/img/bin.svg" alt="">'+
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
        '<button type="button" name="button" class="btn btn-outline-primary trash-btn-post">'+
          '<div>'+
            '<div class="text-center">'+
              '<img src="assets/img/bin.svg" alt="">'+
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

function addTrash(trashAmount, trashName) {
  if ((trashId%2) == 0) {
    addRow(trashId / 2);
  }
  $("#bin"+ trashId).removeClass("invisible");
  $("#amount_"+ trashId).append(trashAmount);
  $("#binLabel"+ trashId++).append(trashName);
}




// Test
$(document).ready (function () {
  addTrash(1, "Wertstoffe");
  addTrash(2, "Altpapier");
  addTrash(3, "Restabfall");
  addTrash(4, "Bioabfall");
  addTrash(5, "Altglass");

  addTrashLocation({lat: 51.5046, lng: 7.5262}, 0);
  addTrashLocation({lat: 51.5046, lng: 7.5265}, 1);
  addTrashLocation({lat: 51.5046, lng: 7.5269}, 2);

  for (var [key, value] of markerMap) {
    console.log(key + ' = ' + value);
  }

});
