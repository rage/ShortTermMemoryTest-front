function PracticeFeedbackEnd(gameData) {

    var gui = new GUI();


    function show(){

        gui.createNew(
            [
                {
                    "type": "div",
                    "id": "ResultEnd"
                }
            ]
        );


        var results = "";

        function setWrongOrRightText() {

            if (gameData.result.lastSeriesCorrectness) {
                results += text["oikeinIlmoitus"];
            } else {
                results += text["vaarinIlmoitus"];
            }

        }

        setWrongOrRightText();

        if (gameData.getdonePracticeRounds() < gameData.maxPracticeRounds) {
            results += text["harjoitusValmis"];
        }else{
            results += text["tehtavaAlkaa"];
        }

        $("#ResultEnd").html(results);

        gameData.requestFocus(function (event, keyCode) {

            if (keyCode === 13) {
                gameData.getEventHandler().triggerEvent("EVENT_PRACTICE_GAME_END", "", 0);
                stateMachine.startGame("GAME");
            }

            if (keyCode === 32) {

                if (gameData.getdonePracticeRounds() < gameData.maxPracticeRounds) {
                    gameData.getEventHandler().triggerEvent("EVENT_PRACTICE_GAME_END", "", 0);
                    gameData.getEventHandler().triggerEvent("EVENT_PRACTICE_GAME_START", "", 0);
                }

            }

        });
    }

    return {
        show:show
    };

}

