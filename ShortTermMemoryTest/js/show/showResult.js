
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

    var firstline = "You were shown " + gameData.result.numberOfShownSeries + " sets of numbers.";
    var secondline = " You returned " + gameData.result.numberOfCorrectGivenSeries + " (" + percentCorrect + "%) of these correctly.";

    if (gameData.mode == "PRACTICE") {

        var thirdline = "Press enter to to stop practicing and start the test";
        var fourthline = "Press space to do the practice series again.";

        gameData.requestFocus(function (event, keyCode) {
            if (keyCode == 13) {
                hideResult(event);
                gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_END", "", 0);
                gameData.mode = "GAME";
                gameData.eventHandler.triggerEvent("EVENT_GAME_START", "", 0);
                //stateMachine.startGame("GAME");
            } else if (keyCode == 32) {
                hideResult(event);
                gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_START", "", 0);
            }
        });
    } else {
        var thirdline = "Thank you for participating.";
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

