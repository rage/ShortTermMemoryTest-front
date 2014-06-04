/**
 * Created by kristiak on 23.5.2014.
 */

function showNumber(number) {

    function createHTML() {
        $("body").html("<div id=\"Game\">\
        <div id = \"num_field\"></div>\
        </div>");
    }

    createHTML();

    $("#num_field").show();
    $("#num_field").html(number);
}

function hideNumber() {
    $("#num_field").hide();
}
