function showPracticeFeedbackEnd(gameData) {

    var gameData = gameData;

    function createHTML() {
        var htmlStructure = "<div id=\"ResultEnd\"></div>";
        $("body").html(htmlStructure);
    }

    createHTML();

    var results = "";

    function setWrongOrRightText() {

        if (gameData.result.lastSeriesCorrectness == true) {
            results += text["oikeinIlmoitus"];
        } else {
            results += text["vaarinIlmoitus"];
        }

    }
    
    setWrongOrRightText();

    if (gameData.donePracticeRounds < gameData.maxPracticeRounds) {
        results += text["harjoitusValmis"];
    }else{
        results += text["tehtavaAlkaa"];
    }

    $("#ResultEnd").html(results);

    gameData.requestFocus(function (event, keyCode) {
        if (keyCode == 13) {
            gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_END", "", 0);
            stateMachine.startGame("GAME");
        }
        if (keyCode == 32) {
            if (gameData.donePracticeRounds < gameData.maxPracticeRounds) {
                gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_END", "", 0);
                gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_START", "", 0);
            }
        }
    });

}

