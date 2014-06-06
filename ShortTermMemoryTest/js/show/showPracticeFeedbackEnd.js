/**
 * Created by kristiak on 23.5.2014.
 */

function showPracticeFeedbackEnd(gameData) {

    var gameData = gameData;

    function createHTML() {
        var htmlStructure = "<div id=\"Result\">\
                                <h1 id=\"firstline\"></h1>\
                                <h1 id=\"secondline\"></h1>\
                                <h1 id=\"thirdline\"></h1>\
                             </div>";
        $("body").html(htmlStructure);
    }

    createHTML();

    if (gameData.result.lastSeriesCorrectness == true) {
        $("#firstline").html(text["oikein"]);
        $("#secondline").html(text["oikeinIlmoitus"]);
    } else {
        $("#firstline").html(text["vaarin"]);
        $("#secondline").html(text["vaarinIlmoitus"]);

    }
    if (gameData.donePracticeRounds < gameData.maxPracticeRounds) {
        $("#thirdline").html(text["harjoitusValmis"]);
    }else{
        $("#thirdline").html(text["tehtavaAlkaa"]);
    }



    console.log("asd");
    console.log(gameData.numberList.length);
    console.log(gameData.numberListIndex);



    gameData.requestFocus(function (event, keyCode) {
        if (keyCode == 13) {
            gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_END", "", 0);
            hidePracticeFeedback(event);
            stateMachine.startGame("GAME");
        }
        if (keyCode == 32) {
            if (gameData.donePracticeRounds < gameData.maxPracticeRounds) {
                gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_END", "", 0);
                gameData.donePracticeRounds++;
                hidePracticeFeedback(event);
                gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_START", "", 0);

            }
        }
    });


    function hidePracticeFeedback(event) {
        $("#Result").html("");
    }
}

