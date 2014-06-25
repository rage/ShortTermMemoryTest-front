function ShowResult(gameData, settings) {

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


    gameData.result = CalculateResult(gameData.getEventHandler().getStoredEvents(), gameData.gameStartTime, settings);

    var percentCorrect = (100 * gameData.result.numberOfCorrectGivenSeries / gameData.result.numberOfShownSeries).toFixed();

    var firstline = text["kiitos"];
    var secondline = text["sait"] + percentCorrect + "% "+text["oikein"];
    var thirdline = text['testiOnValmis'];

    $("#firstline").html(firstline);
    $("#secondline").html(secondline);
    $("#thirdline").html(thirdline);

}
