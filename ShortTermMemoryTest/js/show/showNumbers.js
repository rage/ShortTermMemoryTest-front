function ShowNumber(number) {

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
