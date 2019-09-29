function move() {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 42) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}


function count(){
    var elem = document.getElementById("myScore");
    var count =1;
    var id =setInterval(frame,10);
    function frame(){
        if (count >= 42) {
            clearInterval(id);
        } else {
            count++;
            elem.innerHTML=count.toString();
        }
    }
}

$( document ).ready(function() {
    console.log( "ready!" );
    move();
    count();
});