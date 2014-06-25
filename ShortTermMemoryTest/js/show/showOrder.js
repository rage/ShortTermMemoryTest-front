function Order() {

    function createHTML() {
        $("body").html("<div id=\"Game\">\
        <div id = \"order_field\"></div>\
        </div>\
        ");
    }

    function show(order) {
        createHTML();
        if (order == "upwards") {
            $("#order_field").html(text["palautaEsitys"]);
        } else {
            $("#order_field").html(text["palautaKaantainen"]);
        }
        $("#order_field").show();
    }

    function hide() {
        $("#order_field").hide();
    }

    return {
        show:show,
        hide:hide
    }

}

