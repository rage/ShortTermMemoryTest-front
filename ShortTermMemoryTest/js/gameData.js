///**
// * Created by artokaik on 11.6.2014.
// */
//
//
//
//var gameSettings = {
//    numberDisplayTime: 400,
//    ISITime: 650,
//    guessTime: 2000,
//    showResultTime: 5000,
//    showCrossDelay: 1000,
//    showCrossTime: 500,
//    maxPracticeRounds: 3,
//    maxFails : 1, //Number of failed series allowed before the series of that length are dropped out
//    failLimit : 2, //Correct numbers required in a series for series not to be considered a major fail
//    droppedSeriesMinLength : 6
//}
//
//function GameData(gameMode, theNumberList){
//    var numberListIndex = 0;
//    var fails = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]; //index [7][0] refers to the normal 7 number series and [6][1] to the reversed 6 number series
//    var shownSeries= theNumberList;
//    var numberList=  theNumberList;
//    var donePracticeRounds = 0;
//    var mode = gameMode;
//    var gameIdentifier= "ThisGame";
//    var result = undefined;
//    var eventHandler;
//
//
//    function currentListDirection() { //0 = upwards, 1=backwards
//
//        var a;
//        var i = numberListIndex;
//        if (i < numberList.length) {
//            if (numberList[i].order == "upwards") {
//                a = 0;
//            } else if (numberList[i].order == "backwards") {
//                a = 1;
//            }
//        }
//        return a;
//    }
//
//    function updateNumberListIndex() {
//        this.numberListIndex++;
//        if(mode=="GAME") {
//            var a = currentListDirection();
//            while (numberListIndex < numberList.length && fails[numberList[numberListIndex].numbers.length][a] > maxFails) {
////                shownSeries[numberListIndex] = false;
//                numberListIndex++;
//                a = currentListDirection();
//
//            }
//        }
//    }
//
//    function updateFails(eventHandler){
//        var fail = new calculateResult(eventHandler.getStoredEvents(), 0).lastSeriesFailed;
//        var seriesLength = numberList[numberListIndex].numbers.length;
//        var a= currentListDirection();
//        if (fail && seriesLength >= droppedSeriesMinLength) {
//            fails[seriesLength][a]++;
//        } else {
//            fails[seriesLength][a]=0;
//        }
//
//    }
//    function addPracticeRound(){
//        donePracticeRounds++;
//    }
//    function changeResult(newResult){
//        result = newResult;
//    }
//    function setEventHandler(newEventHandler){
//        eventHandler=newEventHandler;
//    }
//
//
//    return{
//        gameIdentifier: gameIdentifier,
//        numberList: numberList,
//        numberListIndex: numberListIndex,
//        result: result,
//        mode: mode,
//        donePracticeRounds: donePracticeRounds,
//        eventHandler: eventHandler,
//        updateFails: updateFails,
//        updateNumberListIndex: updateNumberListIndex,
//        addPracticeRound: addPracticeRound,
//        changeResult: changeResult,
//        setEventHandler: setEventHandler,
//
//        numberDisplayTime: 300,
//        ISITime: 500,
//        guessTime: 3000,
//        showResultTime: 5000,
//
//        showCrossDelay: 1000,
//        showCrossTime: 500,
//        maxPracticeRounds: 3,
//        maxFails : 1, //Number of failed series allowed before the series of that length are dropped out
//        failLimit : 2, //Correct numbers required in a series for series not to be considered a major fail
//        droppedSeriesMinLength : 6
//
//
//
//    }
//};
//


