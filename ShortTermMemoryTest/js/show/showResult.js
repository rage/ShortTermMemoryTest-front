function Result(gameData, settings) {

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

    function show(){

        if (gameData.getMode() === "PRACTICE") {

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
                    hide();
                    gameData.getEventHandler().triggerEvent("EVENT_SHOWSERIES_START", "", 0);
                }
            });

        } else {

            gameData.result = CalculateResult(gameData.getEventHandler().getStoredEvents(), gameData.gameStartTime, settings);

            var percentCorrect = (100 * gameData.result.numberOfCorrectGivenSeries / gameData.result.numberOfShownSeries).toFixed();

            var firstline = text["kiitos"];
            var secondline = text["sait"] + percentCorrect + "% "+text["oikein"];
            var thirdline = text['testiOnValmis'];

            $("#firstline").html(firstline);
            $("#secondline").html(secondline);
            $("#thirdline").html(thirdline);

        }
    }


    function hide() {
        $("#Result").hide();
    }

    return {
        show:show,
        hide:hide
    };

}
