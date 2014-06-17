function GameData(gameMode, theNumberList, settings){
    var numberListIndex = 0;
    var numberList = theNumberList;
    var donePracticeRounds = 0;
    var fails = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]; //index [7][0] refers to the normal 7 number series and [6][1] to the reversed 6 number series
    var shownSeries= [];
    var mode = gameMode;

    var eventHandler;


    function currentListDirection() { //0 = upwards, 1=backwards
        var a;
        var i = numberListIndex;
        if (i < numberList.length) {
            if (numberList[i].order == "upwards") {
                a = 0;
            } else if (numberList[i].order == "backwards") {
                a = 1;
            }
        }
        return a;
    }

    function updateNumberListIndex() {
        numberListIndex++;
        shownSeries[numberListIndex] = true;
        if(settings.game.droppingSeriesPossible) {
            if (mode == "GAME") {
                var a = currentListDirection();
                var loop = true;
                while (true) {
                    if (numberListIndex >= numberList.length) {
                        break;
                    } else if (fails[numberList[numberListIndex].numbers.length][a] < settings.game.maxFails) {
                        break;
                    } else {
                        shownSeries[numberListIndex] = false;
                        numberListIndex++;
                        a = currentListDirection();
                    }
                }
            }
        }
        return numberListIndex;
    }

    function updateFails(){
        if(settings.game.droppingSeriesPossible) {
            var fail = new CalculateResult(eventHandler.getStoredEvents(), 0, settings).lastSeriesFailed;
            var seriesLength = numberList[numberListIndex].numbers.length;
            var a = currentListDirection();
            if (fail && seriesLength >= settings.game.droppedSeriesMinLength) {
                fails[seriesLength][a]++;
            } else {
                fails[seriesLength][a] = 0;
            }
        }
    }

    function changeResult(newResult){
        result = newResult;
    }
    function setEventHandler(newEventHandler){
        eventHandler=newEventHandler;
    }

    function getEventHandler(){
        return eventHandler;
    }
    function getCurrentSeries(){
        return numberList[numberListIndex];
    }
    function isFinished(){
        if(numberListIndex>=numberList.length){
            return true;
        } else {
            return false;
        }
    }

    function numberListIndexToZero(){
        numberListIndex=0;
    }

    function setNumberList(newNumberList){
        numberList = newNumberList;
    }

    function getMode(){
        return mode;
    }

    function setMode(newMode){
        mode = newMode;
    }

    function getNumberList(){
        return numberList;
    }

    function getdonePracticeRounds(){
        return donePracticeRounds;
    }

    function addDonePracticeRounds(){
        donePracticeRounds++;
    }



    return{
        getEventHandler: getEventHandler,
        updateFails: updateFails,
        updateNumberListIndex: updateNumberListIndex,
        changeResult: changeResult,
        setEventHandler: setEventHandler,
        getCurrentSeries: getCurrentSeries,
        isFinished: isFinished,
        numberListIndexToZero: numberListIndexToZero,


        getdonePracticeRounds: getdonePracticeRounds,
        addDonePracticeRounds: addDonePracticeRounds,
        setMode: setMode,
        getMode: getMode,
        setNumberList: setNumberList,
        getNumberList: getNumberList,

        numberDisplayTime: settings.game.numberDisplayTime,
        ISITime: settings.game.ISITime,
        guessTime: settings.game.guessTime,
        showResultTime: settings.game.showResultTime,
        showCrossDelay: settings.game.showCrossDelay,
        showCrossTime: settings.game.showCrossTime,
        maxPracticeRounds: settings.game.maxPracticeRounds,
        maxFails : settings.game.maxFails, //Number of failed series allowed before the series of that length are dropped out
        failLimit : settings.game.failLimit, //Correct numbers required in a series for series not to be considered a major fail
        droppedSeriesMinLength : settings.game.droppedSeriesMinLength,

        gameIdentifier: "ThisGame",
        result: undefined,
        requestFocus: undefined,

        tag: false


    }
}



