
$( document ).ready(function() {
    console.log( "ready!" );
});


console.log("Javascript is active!");
console.log("Uglifyjs is active too!");


const api = new DirectusSDK({
    url: "https://trashhero.camefrom.space/api/public/"
});

api.getItems("trashitems")
    .then(data => {
        console.log("YAY");
        console.log(data);
        // Do something with the data
    })
    .catch(error => console.error(error));