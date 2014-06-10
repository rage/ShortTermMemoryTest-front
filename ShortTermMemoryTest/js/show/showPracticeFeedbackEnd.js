/**
 * Created by kristiak on 23.5.2014.
 */

function showPracticeFeedbackEnd(gameData) {

    var gameData = gameData;

    function createHTML() {
        var htmlStructure = "<div id=\"ResultEnd\"></div>";
        $("body").html(htmlStructure);
    }

    createHTML();

    var results;

    if (gameData.result.lastSeriesCorrectness == true) {
        results += text["oikeinIlmoitus"];
    } else {
        results += text["vaarinIlmoitus"];

    }
    if (gameData.donePracticeRounds < gameData.maxPracticeRounds) {
        results += text["harjoitusValmis"];
    }else{
        results += text["tehtavaAlkaa"];
    }

    $("#ResultEnd").html(results);

    gameData.requestFocus(function (event, keyCode) {
        if (keyCode == 13) {
            gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_END", "", 0);
            hidePracticeFeedback(event);
            stateMachine.startGame("GAME");
        }
        if (keyCode == 32) {
            if (gameData.donePracticeRounds < gameData.maxPracticeRounds) {
                gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_END", "", 0);
                hidePracticeFeedback(event);
                gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_START", "", 0);

            }
        }
    });


    function hidePracticeFeedback(event) {
        $("#Result").html("");
    }
}

