



console.log("Javascript is active!");
console.log("Uglifyjs is active too!");
let newArray = [];

const api = new DirectusSDK({
    url: "https://trashhero.camefrom.space/api/public/"
});
let response;

api.getItems("trashcans")
    .then(data => {

        response = data;
        console.log("YAY");
        console.log(data.data);
        // Do something with the data

        filterType(data, "other").forEach(function(e) {
            $('.search-results-other').append(e.name + "<br>");
            console.log(e);
        });

        filterType(data, "compostable").forEach(function(e) {
            $('.search-results-compostable').append(e.name + "<br>");
            console.log(e);
        });

        filterType(data, "recycable").forEach(function(e) {
            $('.search-results-recycable').append(e.name + "<br>");
            console.log(e);
        });

        filterType(data, "paper").forEach(function(e) {
            $('.search-results-paper').append(e.name + "<br>");
            console.log(e);
        });

        data.data.forEach(function(e) {
            let name = e.name;
            newArray.push(name);
        });
    })
    .catch(error => console.error(error));

function filterType(data, type) {
    return data.data.filter(function (e) {
        return e.type.includes(type);
    });
}

$( document ).ready(function() {
    console.log( "ready!" );

    $('#search-field').on("keypress", function(e) {
        console.log("LOL");
        if (e.keyCode == 13) {
            alert("Enter pressed");
            return false; // prevent the button click from happening
        }
    });

    $('#search-field').autocomplete({
        source: newArray
    });

});

