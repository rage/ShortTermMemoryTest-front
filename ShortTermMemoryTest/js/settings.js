//var maxFails = 1; //Number of failed series allowed before the series of that length are dropped out
//var failLimit = 2; //Correct numbers required in a series for series not to be considered a major fail
//var droppedSeriesMinLength = 6;

var debug = false;

var konsoli = function (){
    function log(logi){
        if(debug){
            console.log(logi);
        }
    }

    return {
        log:log
    }

}();

function Settings(){
    var url = "http://shorttermmemorytest.herokuapp.com/";
    //var url = "http://localhost:3000/"
    var gameSettings = {
        numberDisplayTime: 100,
        ISITime: 250,
        guessTime: 500,
        showResultTime: 5000,
        showCrossDelay: 1000,
        showCrossTime: 500,
        maxPracticeRounds: 3,
        maxFails : 1, //Number of failed series allowed before the series of that length are dropped out
        failLimit : 2, //Correct numbers required in a series for series not to be considered a major fail
        droppedSeriesMinLength : 6,
        droppingSeriesPossible: true
    }

    return {
        url:url,
        game:gameSettings
    }

}

var gameSettings = {
    numberDisplayTime: 1000,
    ISITime: 1500,
    guessTime: 10000,
    showResultTime: 10000,
    showCrossDelay: 1000,
    showCrossTime: 500,
    maxPracticeRounds: 3,
    maxFails : 1, //Number of failed series allowed before the series of that length are dropped out
    failLimit : 2, //Correct numbers required in a series for series not to be considered a major fail
    droppedSeriesMinLength : 6,
    droppingSeriesPossible: true
}
