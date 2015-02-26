function Settings(){
    var url = "https://stmt.herokuapp.com/";

    var frontId = "1";

    var game = {
        numberDisplayTime: 1000,
        ISITime: 1500,
        guessTime: 10000,
        showResultTime: 10000,
        showCrossDelay: 1000,
        showCrossTime: 500,
        maxPracticeRounds: 3,
        maxFails : 1, //Numbers of failed series allowed before the series of that length are dropped out
        failLimit : 2, //Correct numbers required in a series for series not to be considered a major fail
        droppedSeriesMinLength : 6,
        droppingSeriesPossible: true
    };

    return {
        url:url,
        game:game,
        frontId:frontId
    };

}
