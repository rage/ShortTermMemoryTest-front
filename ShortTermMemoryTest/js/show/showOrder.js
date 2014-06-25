function Order() {

    function show(order) {
        var gui = new GUI();

        gui.createNew(
            [
                {
                    "type": "div",
                    "id": "Game",
                    "elements":[
                        {
                            "type": "div",
                            "id": "order_field"
                        }
                    ]
                }
            ]
        );
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

