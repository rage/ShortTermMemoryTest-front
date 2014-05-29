/**
 * Created by kristiak on 23.5.2014.
 */

function showOrder(order) {

    function createHTML() {
        $("body").html("<div id=\"Game\">\
        <ul>\
        <h1 id = \"order_field\"></h1>\
        </ul>\
        </div>\
        ");
    }

    createHTML();

    if (order == "upwards") {
        $("#order_field").html("SAME ORDER");
    } else {
        $("#order_field").html("REVERSE ORDER");
    }
    $("#order_field").show();
}


function hideOrder() {
    $("#order_field").hide();
}
