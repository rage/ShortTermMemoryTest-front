/**
 * Created by kris on 26.5.2014.
 */

function gameLogic (eventHandler) {

    var gameData;

    eventHandler.registerEventHandler("EVENT_GAME_START", startGameEventHandler);
    eventHandler.registerEventHandler("EVENT_GAME_END", endGameEventHandler);

    eventHandler.registerEventHandler("EVENT_PRACTICE_GAME_START", startPracticeGameEventHandler);
    eventHandler.registerEventHandler("EVENT_PRACTICE_GAME_END", endPracticeGameEventHandler);


    eventHandler.registerEventHandler("EVENT_SHOWLIST_START", showListEventHandler);
    eventHandler.registerEventHandler("EVENT_SHOWLIST_END", endShowListEventHandler);

    eventHandler.registerEventHandler("EVENT_SHOWSERIES_START", showSeriesEventHandler);
    eventHandler.registerEventHandler("EVENT_SHOWSERIES_END", endShowSeriesEventHandler);

    eventHandler.registerEventHandler("EVENT_SHOWNUMBER_START", showNumberEventHandler);
    eventHandler.registerEventHandler("EVENT_SHOWNUMBER_END", endShowNumberEventHandler);

    eventHandler.registerEventHandler("EVENT_USERINPUT_START", startUserInputEventHandler);
    eventHandler.registerEventHandler("EVENT_USERINPUT_END", endUserInputEventHandler);

    eventHandler.registerEventHandler("EVENT_SHOWRESULT_START", showResultEventHandler);
    //gameData.eventHandler.registerEventHandler("EVENT_SHOWRESULT_END", endShowResultEventHandler);

    eventHandler.registerEventHandler("EVENT_SHOW_PRACTICE_RESULT_START", showPracticeResultEventHandler);
    eventHandler.registerEventHandler("EVENT_SHOW_PRACTICE_RESULT_END", endShowPracticeResultEventHandler);

    eventHandler.registerEventHandler("EVENT_TYPE_KEYDOWN", keyDownEventHandler);



    function showResultEventHandler(event) {
        showResult(gameData);
    }

    function endShowResultEventHandler(event) {
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

    function startPracticeGame() {
        if (gameData.donePracticeRounds >= gameData.maxPracticeRounds) {
            showDoneMaxPractice(gameData);
        } else {
            gameData.eventHandler.triggerEvent("EVENT_PRACTICE_GAME_START", gameData.gameIdentifier, 0);
        }
    }

    function startGame() {
        gameData.gameStartTime = Date.now();
        gameData.eventHandler.triggerEvent("EVENT_GAME_START", gameData.gameIdentifier, 0);
    }

    function requestFocus(focusFunction) {
        $("body").append("<div id='keyDown'></div>");
        $("#keyDown").on("keyDown", focusFunction );
    }

    function setup(gameData) {
        gameData.requestFocus = requestFocus;
        gameData.eventHandler = eventHandler;
    }

    function start (newGameData) {
        gameData = newGameData;
        setup(gameData);
        $("body").html("");
        if (gameData.mode == "PRACTICE") {
            startPracticeGame();
        } else if (gameData.mode == "GAME") {
            startGame();
        }
    }

    return {
        start : start
    }
}
