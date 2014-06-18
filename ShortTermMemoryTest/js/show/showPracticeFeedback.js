function ShowPracticeFeedback(gameData) {

    function createHTML() {
        var htmlStructure = "<div id=\"Result\">\
                                <h1 id=\"firstline\"></h1>\
                                <h1 id=\"secondline\"></h1>\
                                <h1 id=\"thirdline\"></h1>\
                             </div>";
        $("body").html(htmlStructure);
    }

    createHTML();

    function WrongRightFeedback() {
        if (gameData.result.lastSeriesCorrectness) {
            $("#secondline").html(text["oikeinIlmoitus"]);
            $("#thirdline").html(text["seuraava"]);
        } else {
            $("#secondline").html(text["vaarinIlmoitus"]);
            $("#thirdline").html(text["seuraava"]);
        }
    }

    WrongRightFeedback();

    gameData.requestFocus(function (event, keyCode) {
        if (keyCode === 32) {
            hidePracticeFeedback(event);
            gameData.getEventHandler().triggerEvent("EVENT_SHOWSERIES_START", "", 0);
        }
    });


    function hidePracticeFeedback(event) {
        $("#Result").html("");
    }
}

