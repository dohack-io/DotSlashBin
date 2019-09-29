



console.log("Javascript is active!");
console.log("Uglifyjs is active too!");
let newArray = [];

const api = new DirectusSDK({
    url: "https://trashhero.camefrom.space/api/public/"
});


//get data for trashpedia
let pediaResponse;

api.getItems("trashitems")
    .then(data => {

        pediaResponse = data.data;
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
        if (e.keyCode == 13) {
            searchItems($('#search-field').val());
            return false; // prevent the button click from happening
        }
    });


});

function searchItems(term) {
    let searchResults = [];
    if (term === "") {
        $('.pedia-content').show();
        $('.pedia-results').hide();
    } else {
        $('.pedia-content').hide();
        $('.pedia-results').html('<ul id="pedia-results-list"></ul>');
        $('.pedia-results').show();
        pediaResponse.forEach(function(e) {
            if (e['name'].toLowerCase().indexOf(term.toLowerCase()) !== -1) {
                searchResults.push(e);
            }
        });

        searchResults.forEach(function(e) {
            $('#pedia-results-list').append('<li><i class="icon-bin '+ e['type'][1] +'"></i>' + e['name'] + '</li>')
        });

        console.log(searchResults);
    }
}

Array.prototype.containsSubStringOrHasSubstringOf = function( text ){
    for ( var i = 0; i < this.length; ++i )
    {
        if (    this[i].toString().indexOf( text.toString() ) != -1
            || text.toString().indexOf( this[i].toString() ) != -1 )
            return i;
    }
    return -1;
};

