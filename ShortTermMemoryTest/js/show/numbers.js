function Numbers() {

    function show(number){
        var gui = new GUI();
        gui.run("GameNumbers");
        gui.updateThisText("num_field", number);
    }

    function hide() {
        $("#num_field").hide();
    }

    return {
        show:show,
        hide:hide
    };
}

