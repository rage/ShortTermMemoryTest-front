/**
 * Created by kristiak on 23.5.2014.
 */

function showNumber(number) {

    function createHTML() {
        $("body").html("<div id=\"Game\">\
        <ul>\
        <h1 id = \"num_field\"></h1>\
        </ul>\
        </div>\
        ");
    }

    createHTML();

    $("#num_field").show();
    $("#num_field").html(number);
}

function hideNumber() {
    $("#num_field").hide();
}
