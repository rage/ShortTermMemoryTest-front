function showOrder(order) {

    function createHTML() {
        $("body").html("<div id=\"Game\">\
        <div id = \"order_field\"></div>\
        </div>\
        ");
    }

    createHTML();

    if (order == "upwards") {
        $("#order_field").html(text["palautaEsitys"]);
    } else {
        $("#order_field").html(text["palautaKaantainen"]);
    }
    $("#order_field").show();
}


function hideOrder() {
    $("#order_field").hide();
}
