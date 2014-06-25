function ShowPracticeFeedback(gameData) {

    var gui = new GUI();

    gui.createNew(
        [
            {
                "type": "div",
                "id": "Result",
                "elements":[
                    {
                        "type": "div",
                        "id": "firstline"
                    },
                    {
                        "type": "div",
                        "id": "secondline"
                    },
                    {
                        "type": "div",
                        "id": "thirdline"
                    }
                ]
            }
        ]
    );


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

