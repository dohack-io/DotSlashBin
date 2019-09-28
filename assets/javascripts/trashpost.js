// Variables
var countBin = 0;





// Controll function
function resetTrashes () {
  for (var i = 1; i <=5; i++) {
    var element = $("#bin" + i);

  }
}


function addTrashes (trashes) {
  countBin++
}


// Help function
function addRow(row){
  var tmpSection = $("#trash-btn-collection");
    tmpSection.append(
    '<div class="row">'+
      '<div class="col-6 invisible" id="bin' + (row + 1) +'">'+
        '<button type="button" name="button" class="btn btn-outline-primary trash-btn-post">' +
          '<div>' +
            '<div class="text-center">'+
              '<img src="assets/img/bin.svg" alt="">'+
              '<p id="amount_' + (row + 1) +'">x</p>'+
            '</div>'+
            '<div class="row">'+
              '<div class="w-100"></div>'+
              '<div class="col" id="binLabel' + (row + 1) + '"></div>'+
            '</div>'+
          '</div>'+
        '</button>'+
      '</div>'+
      '<div class="col-6 invisible" id="bin' + (row + 2) +'">'+
        '<button type="button" name="button" class="btn btn-outline-primary trash-btn-post">'+
          '<div>'+
            '<div class="text-center">'+
              '<img src="assets/img/bin.svg" alt="">'+
              '<p id="amount_' + (row + 2) +'">x</p>'+
            '</div>'+
            '<div class="row">'+
              '<div class="w-100"></div>'+
              '<div class="col" id="binLabel' + (row + 2) +'"></div>'+
            '</div>'+
          '</div>'+
        '</button>'+
      '</div>'+
    '</div>');
}

function addTrash(trashId, trashAmount, trashName) {
  if ((trashId%2) == 0) {
    addRow(trashId / 2 - 1);
  }
  $("#bin"+ trashId).removeClass("invisible");
  $("#amount_"+ trashId).append(trashAmount);
  $("#binLabel"+ trashId).append(trashName);
}




// Test
$(document).ready (function () {
  addTrash(8, 1, "Wertstoffe");
  addTrash(9, 2, "Altpapier");
  addTrash(10, 3, "Restabfall");
  addTrash(11, 4, "Bioabfall");
  addTrash(12, 5, "Altglass");

});
