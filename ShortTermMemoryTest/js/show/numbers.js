function Number() {

    function show(number){
        var gui = new GUI();

        gui.createNew(
            [
                {
                    "type": "div",
                    "id": "Game",
                    "elements":[
                        {
                            "type": "div",
                            "id": "num_field"
                        }
                    ]
                }
            ]
        );

        $("#num_field").html(number);
    }

    function hide() {
        $("#num_field").hide();
    }

    return {
        show:show,
        hide:hide
    };
}

