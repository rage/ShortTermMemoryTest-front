/**
 * Created by kris on 26.5.2014.
 */

function gameLogic (gameData) {

    var gameData = gameData;
    var postResults = new PostResults();
    gameData.requestFocus = requestFocus;

    function requestFocus(focusFunction) {
        $("body").append("<div id='keyDown'></div>");
        $("#keyDown").on("keyDown", focusFunction );
    }

    function setup() {
        gameData.eventHandler.registerEventHandler("EVENT_GAME_START", startGameEventHandler);
        gameData.eventHandler.registerEventHandler("EVENT_GAME_END", endGameEventHandler);

        gameData.eventHandler.registerEventHandler("EVENT_PRACTICE_GAME_START", startPracticeGameEventHandler);
        gameData.eventHandler.registerEventHandler("EVENT_PRACTICE_GAME_END", endPracticeGameEventHandler);


        gameData.eventHandler.registerEventHandler("EVENT_SHOWLIST_START", showListEventHandler);
        gameData.eventHandler.registerEventHandler("EVENT_SHOWLIST_END", endShowListEventHandler);

        gameData.eventHandler.registerEventHandler("EVENT_SHOWSERIES_START", showSeriesEventHandler);
        gameData.eventHandler.registerEventHandler("EVENT_SHOWSERIES_END", endShowSeriesEventHandler);

        gameData.eventHandler.registerEventHandler("EVENT_SHOWNUMBER_START", showNumberEventHandler);
        gameData.eventHandler.registerEventHandler("EVENT_SHOWNUMBER_END", endShowNumberEventHandler);

        gameData.eventHandler.registerEventHandler("EVENT_USERINPUT_START", startUserInputEventHandler);
        gameData.eventHandler.registerEventHandler("EVENT_USERINPUT_END", endUserInputEventHandler);

        gameData.eventHandler.registerEventHandler("EVENT_SHOWRESULT_START", showResultEventHandler);
        gameData.eventHandler.registerEventHandler("EVENT_SHOWRESULT_END", endShowResultEventHandler);

        gameData.eventHandler.registerEventHandler("EVENT_SHOW_PRACTICE_RESULT_START", showPracticeResultEventHandler);
        gameData.eventHandler.registerEventHandler("EVENT_SHOW_PRACTICE_RESULT_END", endShowPracticeResultEventHandler);



        gameData.eventHandler.registerEventHandler("EVENT_TYPE_KEYDOWN", keyDownEventHandler);
    }

    function showResultEventHandler(event) {
        showResult(gameData);
        postResults.post(gameData.eventHandler.getStoredEvents());
        //console.log(JSON.stringify(gameData.eventHandler.getStoredEvents()));
    }

    function endShowResultEventHandler(event) {
        if (gameData.mode == "PRACTICE") {
            gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_END", gameData.gameIdentifier, 0);
            if (gameData.practiceRedo == true) {
                gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_START", gameData.gameIdentifier, 0);
            }

        } else {
            gameData.eventHandler.triggerEvent("EVENT_GAME_END", gameData.gameIdentifier, 0);
        }
    }

    function startUserInputEventHandler(event) {
        showOrder(gameData.numberList[gameData.numberListIndex].order);
        gameData.eventHandler.triggerEvent("EVENT_USERINPUT_END", "", gameData.guessTime);
    }

    function endUserInputEventHandler(event) {
        hideOrder();
        var numberBlankTime = gameData.ISITime - gameData.numberDisplayTime;
        gameData.numberListIndex++;
        if (gameData.mode == "GAME") {
            if (gameData.numberListIndex < gameData.numberList.length) {
                gameData.eventHandler.triggerEvent("EVENT_SHOWSERIES_START", "", 0);
            } else {
                gameData.eventHandler.triggerEvent("EVENT_SHOWLIST_END", "", numberBlankTime);
            }
        } else if (gameData.mode == "PRACTICE") {
            gameData.eventHandler.triggerEvent("EVENT_SHOW_PRACTICE_RESULT_START", "", numberBlankTime);
        }
    }

    function showPracticeResultEventHandler(event) {
        gameData.result = calculateResult(gameData.eventHandler.getStoredEvents(), gameData.gameStartTime);
        showPracticeFeedback(gameData);
    }

    function endShowPracticeResultEventHandler(event) {
        var numberBlankTime = gameData.ISITime - gameData.numberDisplayTime;
        if (gameData.numberListIndex < gameData.numberList.length) {
            gameData.eventHandler.triggerEvent("EVENT_SHOWSERIES_START", "", numberBlankTime);
        } else {
            gameData.eventHandler.triggerEvent("EVENT_SHOWLIST_END", "", numberBlankTime);
        }
    }


    function keyDownEventHandler(event) {
        $("#keyDown").trigger("keyDown", event.message);
    }


    function startPracticeGameEventHandler() {
        gameData.gameStartTime = Date.now();
        //showInstructions(gameData);
        gameData.eventHandler.triggerEvent("EVENT_SHOWLIST_START", "", 0);
    }

    function endPracticeGameEventHandler(event) {

    }

    function startGameEventHandler(event) {
        gameData.gameStartTime = Date.now();
        //showInstructions(gameData);
        gameData.eventHandler.triggerEvent("EVENT_SHOWLIST_START", "", 0);
    }

    function endGameEventHandler(event) {
    }

    function showListEventHandler() {
        gameData.numberListIndex = 0;
        gameData.eventHandler.triggerEvent("EVENT_SHOWSERIES_START", "", 0);
    }

    function endShowListEventHandler(event) {
        
        gameData.eventHandler.triggerEvent("EVENT_SHOWRESULT_START", "", 0);

    }

    function showSeriesEventHandler() {
        var delay = 1000;
        var series = gameData.numberList[gameData.numberListIndex];
        for (var i = 0; i < series.numbers.length; i++) {
            gameData.eventHandler.triggerEvent("EVENT_SHOWNUMBER_START", series.numbers[i], delay + gameData.ISITime * i);
            gameData.eventHandler.triggerEvent("EVENT_SHOWNUMBER_END", series.numbers[i], delay + gameData.ISITime * i + gameData.numberDisplayTime);
        }
        gameData.eventHandler.triggerEvent("EVENT_SHOWSERIES_END", "", delay + gameData.ISITime * i);
        gameData.eventHandler.triggerEvent("EVENT_USERINPUT_START", gameData.numberList[gameData.numberListIndex].order, delay + gameData.ISITime * i);
    }

    function endShowSeriesEventHandler(event) {

    }

    function showNumberEventHandler(event) {
        var number = event.message;
        showNumber(number);
    }

    function endShowNumberEventHandler(event) {
        hideNumber();
    }


    function start () {
        setup();
        $("body").html("");
        if (gameData.mode == "PRACTICE") {
            gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_START", gameData.gameIdentifier, 0);
        } else {
            gameData.eventHandler.triggerEvent("EVENT_GAME_START", gameData.gameIdentifier, 0);
        }
    }

    return {
        start : start
    }
}
