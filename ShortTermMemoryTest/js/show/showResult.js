function showResult(gameData) {

    function createHTML() {
        var htmlStructure = "<div id=\"Result\">\
                                <h1 id=\"firstline\"></h1>\
                                <h1 id=\"secondline\"></h1>\
                                <h1 id=\"thirdline\"></h1>\
                             </div>";
        $("body").html(htmlStructure);
    }


    createHTML();

    gameData.result = calculateResult(gameData.eventHandler.getStoredEvents(), gameData.gameStartTime);

    var percentCorrect = (100 * gameData.result.numberOfCorrectGivenSeries / gameData.result.numberOfShownSeries).toFixed();

    var firstline = text["kiitos"];
    var secondline = text["sait"] + percentCorrect + "% "+text["oikein"];
    var thirdline = "Sivusto ohjaa sinut hetken kuluttua aloitussivulle.";

    $("#firstline").html(firstline);
    $("#secondline").html(secondline);
    $("#thirdline").html(thirdline);

}

function hideResult() {
    $("#Result").html("");
}

