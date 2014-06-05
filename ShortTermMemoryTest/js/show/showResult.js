
/**
 * Created by kristiak on 23.5.2014.
 */

function showResult(gameData) {

    function createHTML() {
        var htmlStructure = "<div id=\"Result\">\
                                <h1 id=\"firstline\"></h1>\
                                <h1 id=\"secondline\"></h1>\
                                <h1 id=\"thirdline\"></h1>\
                                 <h1 id=\"fourthline\"></h1>\
                             </div>";
        $("body").html(htmlStructure);
    }


    createHTML();

    gameData.result = calculateResult(gameData.eventHandler.getStoredEvents(), gameData.gameStartTime);

    var percentCorrect = (100 * gameData.result.numberOfCorrectGivenSeries / gameData.result.numberOfShownSeries).toFixed();

    var firstline = text["kiitos"]
    var secondline = text["sait"] + percentCorrect + "% "+text["oikein"];


    if (gameData.mode == "PRACTICE") {

        if (gameData.donePracticeRounds < gameData.maxPracticeRounds) {
            var thirdline = "Press enter to to stop practicing and start the test";
            var fourthline = "Press space to do the practice series again.";

            gameData.requestFocus(function (event, keyCode) {
                if (keyCode == 13) {
                    hideResult(event);
                    gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_END", "", 0);
                    stateMachine.startGame("GAME");
                    //gameData.mode = "GAME";
                    //gameData.eventHandler.triggerEvent("EVENT_GAME_START", "", 0);
                } else if (keyCode == 32) {
                    hideResult(event);
                    gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_START", "", 0);
                }
            });
        } else {
            var thirdline = "You have now practiced the maximum allowed times.";
            var fourthline = "Press enter to to stop practicing and start the test";

            gameData.requestFocus(function (event, keyCode) {
                if (keyCode == 13) {
                    hideResult(event);
                    gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_END", "", 0);
                    //gameData.mode = "GAME";
                    //gameData.eventHandler.triggerEvent("EVENT_GAME_START", "", 0);
                    stateMachine.startGame("GAME");
                }
            });
        }
    } else {
        var firsline = text["kiitos"];
        var thirdline = "Sivusto ohjaa sinut hetken kuluttua aloitussivulle.";
        gameData.requestFocus(function (event, keyCode) {
            if (keyCode == 13) {
                hideResult(event);
                gameData.eventHandler.triggerEvent("EVENT_SHOWRESULT_END", "", 0);
            }
        });
    }
    $("#firstline").html(firstline);
    $("#secondline").html(secondline);
    $("#thirdline").html(thirdline);
    $("#fourthline").html(fourthline);

}

function hideResult() {
    $("#Result").html("");
}

