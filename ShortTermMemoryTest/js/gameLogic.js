function GameLogic (eventHandler, user, settings) {


    var postResults = new PostResults(user, settings);
    var postTestLog = new PostTestLog(user, settings);

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
    eventHandler.registerEventHandler("EVENT_SHOWRESULT_END", endShowResultEventHandler);

    eventHandler.registerEventHandler("EVENT_SHOW_PRACTICE_RESULT_START", showPracticeResultEventHandler);
    eventHandler.registerEventHandler("EVENT_SHOW_PRACTICE_RESULT_END", endShowPracticeResultEventHandler);

    eventHandler.registerEventHandler("EVENT_TYPE_KEYDOWN", keyDownEventHandler);


    eventHandler.registerEventHandler("EVENT_SHOWCROSS_START", showCrossEventHandler);
    eventHandler.registerEventHandler("EVENT_SHOWCROSS_END", endShowCrossEventHandler);



    function showResultEventHandler(event) {
        ShowResult(gameData, settings);
        var events = gameData.getEventHandler().getStoredEvents();
        postResults.post(events);
        postTestLog.post(events);
        new Request().createPost(settings.url+"finish", "id=" + user.testCase());
        gameData.getEventHandler().triggerEvent("EVENT_SHOWRESULT_END", "", gameData.showResultTime);
    }

    function endShowResultEventHandler(event) {
        stateMachine.start();
    }


    function startUserInputEventHandler(event) {
        ShowOrder(gameData.getCurrentSeries().order);
        gameData.getEventHandler().triggerEvent("EVENT_USERINPUT_END", "", gameData.guessTime);
    }

    function endUserInputEventHandler(event) {
        hideOrder();
        var numberBlankTime = settings.game.ISITime - settings.game.numberDisplayTime;
        gameData.updateFails(eventHandler);
        gameData.updateNumberListIndex();
        if (gameData.getMode() === "GAME") {
            if (!gameData.isFinished()) {
                gameData.getEventHandler().triggerEvent("EVENT_SHOWSERIES_START", "", 0);
            } else {
                gameData.getEventHandler().triggerEvent("EVENT_SHOWLIST_END", "", numberBlankTime);
            }
        } else if (gameData.getMode() === "PRACTICE") {
            gameData.getEventHandler().triggerEvent("EVENT_SHOW_PRACTICE_RESULT_START", "", numberBlankTime);
        }
        var events = gameData.getEventHandler().getStoredEvents();
        postResults.post(events);
        postTestLog.post(events);


    }

    function showPracticeResultEventHandler(event) {

        gameData.result = CalculateResult(gameData.getEventHandler().getStoredEvents(), gameData.gameStartTime, settings);
        if (gameData.isFinished()) {
            new Request().createPost(settings.url+"finish", "id=" + user.testCase());
            gameData.addDonePracticeRounds();
            ShowPracticeFeedbackEnd(gameData);
        }else{
            ShowPracticeFeedback(gameData);
        }

    }

    function endShowPracticeResultEventHandler(event) {
    }


    function keyDownEventHandler(event) {
        $("#keyDown").trigger("keyDown", event.message);
    }


    function startPracticeGameEventHandler() {
        gameData.gameStartTime = Date.now();
        gameData.getEventHandler().triggerEvent("EVENT_SHOWLIST_START", "", 0);
    }


    function endPracticeGameEventHandler(event) {

    }

    function startGameEventHandler(event) {

        gameData.gameStartTime = Date.now();
        gameData.getEventHandler().triggerEvent("EVENT_SHOWLIST_START", "", 0);
    }

    function endGameEventHandler(event) {
    }

    function showListEventHandler() {
        gameData.numberListIndexToZero();
        gameData.getEventHandler().triggerEvent("EVENT_SHOWSERIES_START", "", 0);
    }

    function endShowListEventHandler(event) {
        
        gameData.getEventHandler().triggerEvent("EVENT_SHOWRESULT_START", "", 0);

    }

    function showSeriesEventHandler() {
        var delay = 0;
        delay += gameData.showCrossDelay;
        gameData.getEventHandler().triggerEvent("EVENT_SHOWCROSS_START", "", delay);
        delay += gameData.showCrossTime;
        gameData.getEventHandler().triggerEvent("EVENT_SHOWCROSS_END", "", delay);

        delay += gameData.ISITime - gameData.numberDisplayTime;
        var series = gameData.getCurrentSeries();
        for (var i = 0; i < series.numbers.length; i++) {
            gameData.getEventHandler().triggerEvent("EVENT_SHOWNUMBER_START", series.numbers[i], delay + gameData.ISITime * i);
            gameData.getEventHandler().triggerEvent("EVENT_SHOWNUMBER_END", series.numbers[i], delay + gameData.ISITime * i + gameData.numberDisplayTime);
        }

        gameData.getEventHandler().triggerEvent("EVENT_SHOWSERIES_END", "", delay + gameData.ISITime * i);
        gameData.getEventHandler().triggerEvent("EVENT_USERINPUT_START", gameData.getCurrentSeries().order, delay + gameData.ISITime * i);
    }

    function endShowSeriesEventHandler(event) {

    }

    function showCrossEventHandler(event) {
        ShowNumber("+");
    }

    function endShowCrossEventHandler(event) {
        hideNumber();
    }


    function showNumberEventHandler(event) {
        var number = event.message;
        ShowNumber(number);
    }

    function endShowNumberEventHandler(event) {
        hideNumber();
    }

    function startPracticeGame() {
        gameData.getEventHandler().triggerEvent("EVENT_PRACTICE_GAME_START", gameData.gameIdentifier, 0);

    }

    function startGame() {
        gameData.gameStartTime = Date.now();
        gameData.getEventHandler().triggerEvent("EVENT_GAME_START", gameData.gameIdentifier, 0);
    }

    function requestFocus(focusFunction) {
        $("body").append("<div id='keyDown'></div>");
        $("#keyDown").on("keyDown", focusFunction );
    }

    function setup(gameData) {
        gameData.requestFocus = requestFocus;
        gameData.setEventHandler(eventHandler);
    }

    function start (newGameData) {

        gameData = newGameData;
        setup(gameData);
        $("body").html("");
        if (gameData.getMode() === "PRACTICE") {
            startPracticeGame();
        } else if (gameData.getMode() === "GAME") {
            startGame();
        }
    }

    return {
        start : start
    }
}
