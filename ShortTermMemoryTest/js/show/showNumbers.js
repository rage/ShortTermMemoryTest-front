function Number() {

    function createHTML() {
        $("body").html("<div id=\"Game\">\
        <div id = \"num_field\"></div>\
        </div>");
    }

    function show(number){
        createHTML();

        $("#num_field").show();
        $("#num_field").html(number);
    }

    function hide() {
        $("#num_field").hide();
    }

    return {
        show:show,
        hide:hide
    }
}

