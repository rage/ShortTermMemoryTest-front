function ShowResult(gameData, settings) {

    function createHTML() {
        var htmlStructure = '<div id="Result">\
                                <h1 id="firstline\"></h1>\
                                <h1 id="secondline"></h1>\
                                <h1 id="thirdline"></h1>\
                             </div>';
        $("body").html(htmlStructure);
    }


    createHTML();

    gameData.result = CalculateResult(gameData.getEventHandler().getStoredEvents(), gameData.gameStartTime, settings);

    var percentCorrect = (100 * gameData.result.numberOfCorrectGivenSeries / gameData.result.numberOfShownSeries).toFixed();

    var firstline = text["kiitos"];
    var secondline = text["sait"] + percentCorrect + "% "+text["oikein"];
    var thirdline = text['testiOnValmis'];

    $("#firstline").html(firstline);
    $("#secondline").html(secondline);
    $("#thirdline").html(thirdline);

}
