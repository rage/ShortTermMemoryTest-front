

describe("calculateResult ", function() {



    var startSeries = "EVENT_SHOWSERIES_START";
    var endSeries = "EVENT_SHOWSERIES_END";
    var gameEnd = "EVENT_GAME_END";
    var keyDown = "EVENT_TYPE_KEYDOWN";
    var keyUp = "EVENT_TYPE_KEYUP";
    var showNumber = "EVENT_SHOWNUMBER_START";
    var hideNumber = "EVENT_SHOWNUMBER_END";
    var orderNormal = "upwards";
    var orderReversed = "backwards";
    var startTyping = "EVENT_USERINPUT_START";
    var endTyping = "EVENT_USERINPUT_END";
    var storer;

    beforeEach(function() {


    });


    it("numberOfShownSets correct when one set is shown ", function() {
        storer = new eventStorer();
        storer.registerEvent(startSeries, orderNormal, 777);
        storer.registerEvent(endSeries, orderNormal, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
    });

   it("numberOfShownSets correct when two sets are shown ", function() {
        storer = new eventStorer();
        storer.registerEvent(startSeries, orderNormal, 777);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startSeries, orderNormal, 777);
        storer.registerEvent(endSeries, orderNormal, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(2);
    });

    it("correct result when one 3-number set and correct answer is given ", function() {
        storer = new eventStorer();
        storer.registerEvent(startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startTyping, orderNormal, 777);
        typeNumbers(7,8,5);
        storer.registerEvent(endTyping, orderNormal, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(1);
        expect(calculator.lastSeriesCorrectness).toBe(true)
    });


    it("correct result when one 3-number backwards-set and correct answer is given ", function() {
        storer = new eventStorer();
        storer.registerEvent(startSeries, orderReversed, 777);
        showNumbers(7,8,5);
        storer.registerEvent(endSeries, orderReversed, 777);
        storer.registerEvent(startTyping, orderReversed, 777);
        typeNumbers(5,8,7);
        storer.registerEvent(endTyping, orderReversed, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(1);
        expect(calculator.lastSeriesCorrectness).toBe(true)
    });

    it("correct result when one 6-number backwards-set and correct answer is given ", function() {
        storer = new eventStorer();
        storer.registerEvent(startSeries, orderReversed, 777);
        showNumbers(7,8,5,6,4,2);
        storer.registerEvent(endSeries, orderReversed, 777);
        storer.registerEvent(startTyping, orderReversed, 777);
        typeNumbers(2, 4, 6, 5, 8, 7);
        storer.registerEvent(endTyping, orderReversed, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(1);
        expect(calculator.lastSeriesCorrectness).toBe(true)
    });

    it("incorrect answer when one 3-number set and one the last number is typed after deadline ", function() {
        storer = new eventStorer();
        storer.registerEvent(startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startTyping, orderNormal, 777);
        typeNumbers(7,8);
        storer.registerEvent(endTyping, orderNormal, 777);
        typeNumbers(5);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(0);
        expect(calculator.lastSeriesCorrectness).toBe(false)
    });

    it("incorrect answer when one 3-number set and one extra number is given ", function() {
        storer = new eventStorer();
        storer.registerEvent(startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startTyping, orderNormal, 777);
        typeNumbers(7,8,5,5);
        storer.registerEvent(endTyping, orderNormal, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(0);
        expect(calculator.lastSeriesCorrectness).toBe(false)
    });

    it("correct answer when one 3-number set and one extra number is given after deadline ", function() {
        storer = new eventStorer();
        storer.registerEvent(startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startTyping, orderNormal, 777);
        typeNumbers(7,8,5);
        storer.registerEvent(endTyping, orderNormal, 777);
        typeNumbers(5);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(1);
        expect(calculator.lastSeriesCorrectness).toBe(true)
    });

    it("incorrect answer when one 3-number set and the first number is missing from answer ", function() {
        storer = new eventStorer();
        storer.registerEvent(startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startTyping, orderNormal, 777);
        typeNumbers(8,5);
        storer.registerEvent(endTyping, orderNormal, 777);
        typeNumbers(5);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(0);
        expect(calculator.lastSeriesCorrectness).toBe(false)
    });


    it("correct answers when two 3-number sets and both answers are correct", function() {
        storer = new eventStorer();
        storer.registerEvent(startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startTyping, orderNormal, 777);
        typeNumbers(7,8,5);
        storer.registerEvent(endTyping, orderNormal, 777);

        storer.registerEvent(startSeries, orderNormal, 777);
        showNumbers(1,2,3);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startTyping, orderNormal, 777);
        typeNumbers(1,2,3);
        storer.registerEvent(endTyping, orderNormal, 777);

        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(2);
        expect(calculator.numberOfCorrectGivenSeries).toBe(2);
        expect(calculator.lastSeriesCorrectness).toBe(true)
    });

    it("one correct and one incorrect answer when two 3-number sets and the first answer is correct", function() {
        storer = new eventStorer();
        storer.registerEvent(startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startTyping, orderNormal, 777);
        typeNumbers(7,8,5);
        storer.registerEvent(endTyping, orderNormal, 777);

        storer.registerEvent(startSeries, orderNormal, 777);
        showNumbers(1,2,3);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startTyping, orderNormal, 777);
        typeNumbers(1,3,2);
        storer.registerEvent(endTyping, orderNormal, 777);

        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(2);
        expect(calculator.numberOfCorrectGivenSeries).toBe(1);
        expect(calculator.lastSeriesCorrectness).toBe(false)
    });

    it("one correct and one incorrect answer when two 3-number sets and the second answer is correct", function() {
        storer = new eventStorer();
        storer.registerEvent(startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startTyping, orderNormal, 777);
        typeNumbers(7,8,2);
        storer.registerEvent(endTyping, orderNormal, 777);

        storer.registerEvent(startSeries, orderNormal, 777);
        showNumbers(1,2,3);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startTyping, orderNormal, 777);
        typeNumbers(1,2,3);
        storer.registerEvent(endTyping, orderNormal, 777);

        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(2);
        expect(calculator.numberOfCorrectGivenSeries).toBe(1);
        expect(calculator.lastSeriesCorrectness).toBe(true)
    });

    it("failLimit = 2, order = normal, numbers entered = 7, series length = 7, first 2 numbers are correct and the rest incorrect => series is not considered a fail  ", function() {
        gameSettings.failLimit = 2;

        storer = new eventStorer();
        storer.registerEvent(startSeries, orderNormal, 777);
        showNumbers(7,6,5,4,3,2,1);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startTyping, orderNormal, 777);
        typeNumbers(7,6,1,2,4,3,2);
        storer.registerEvent(endTyping, orderNormal, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(0);
        expect(calculator.lastSeriesCorrectness).toBe(false)
        expect(calculator.lastSeriesFailed).toBe(false)
    });

    it("failLimit = 3, order = normal, numbers entered = 7, series length = 7, first 2 numbers are correct and the rest incorrect => series is considered a fail  ", function() {
        gameSettings.failLimit = 3;

        storer = new eventStorer();
        storer.registerEvent(startSeries, orderNormal, 777);
        showNumbers(7,6,5,4,3,2,1);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startTyping, orderNormal, 777);
        typeNumbers(7,6,2,5,8,7,9);
        storer.registerEvent(endTyping, orderNormal, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(0);
        expect(calculator.lastSeriesCorrectness).toBe(false)
        expect(calculator.lastSeriesFailed).toBe(true)
    });

    it("failLimit = 3, order = normal, numbers entered = 3, series length = 7, all 3 numbers are correct => series is not considered a fail  ", function() {
        gameSettings.failLimit = 3;

        storer = new eventStorer();
        storer.registerEvent(startSeries, orderNormal, 777);
        showNumbers(7,6,5,4,3,2,1);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startTyping, orderNormal, 777);
        typeNumbers(7,6,5);
        storer.registerEvent(endTyping, orderNormal, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(0);
        expect(calculator.lastSeriesCorrectness).toBe(false)
        expect(calculator.lastSeriesFailed).toBe(false)
    });

    it("failLimit = 3, order = normal, numbers entered = 8, series length = 7, first 3 numbers are correct and the rest incorrect => series is not considered a fail  ", function() {
        gameSettings.failLimit = 3;

        storer = new eventStorer();
        storer.registerEvent(startSeries, orderNormal, 777);
        showNumbers(7,6,5,4,3,2,1);
        storer.registerEvent(endSeries, orderNormal, 777);
        storer.registerEvent(startTyping, orderNormal, 777);
        typeNumbers(7,6,5,6,8,7,9,8);
        storer.registerEvent(endTyping, orderNormal, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(0);
        expect(calculator.lastSeriesCorrectness).toBe(false)
        expect(calculator.lastSeriesFailed).toBe(false)
    });

    it("failLimit = 3, order = backwards, numbers entered = 7, series length = 7, numbers entered as order was normal => series is considered a fail  ", function() {
        gameSettings.failLimit = 3;

        storer = new eventStorer();
        storer.registerEvent(startSeries, orderReversed, 777);
        showNumbers(7,6,5,4,3,2,1);
        storer.registerEvent(endSeries, orderReversed, 777);
        storer.registerEvent(startTyping, orderReversed, 777);
        typeNumbers(7,6,5,4,3,2,1);
        storer.registerEvent(endTyping, orderReversed, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(0);
        expect(calculator.lastSeriesCorrectness).toBe(false)
        expect(calculator.lastSeriesFailed).toBe(true)
    });
    it("failLimit = 3, order = backwards, numbers entered = 7, series length = 7, first three numbers correct => series is not considered a fail  ", function() {
        gameSettings.failLimit = 3;

        storer = new eventStorer();
        storer.registerEvent(startSeries, orderReversed, 777);
        showNumbers(7,6,5,4,3,2,1);
        storer.registerEvent(endSeries, orderReversed, 777);
        storer.registerEvent(startTyping, orderReversed, 777);
        typeNumbers(1,2,3,9,8,9,8);
        storer.registerEvent(endTyping, orderReversed, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(0);
        expect(calculator.lastSeriesCorrectness).toBe(false)
        expect(calculator.lastSeriesFailed).toBe(false)
    });

    it("failLimit = 3, order = backwards, numbers entered = 7, series length = 7, all numbers correct => series is not considered a fail  ", function() {
        gameSettings.failLimit = 3;

        storer = new eventStorer();
        storer.registerEvent(startSeries, orderReversed, 777);
        showNumbers(7,6,5,4,3,2,1);
        storer.registerEvent(endSeries, orderReversed, 777);
        storer.registerEvent(startTyping, orderReversed, 777);
        typeNumbers(1,2,3,4,5,6,7);
        storer.registerEvent(endTyping, orderReversed, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(1);
        expect(calculator.lastSeriesCorrectness).toBe(true)
        expect(calculator.lastSeriesFailed).toBe(false)
    });

    it("failLimit = 3, order = backwards, numbers entered = 3, series length = 7, all three numbers correct => series is not considered a fail  ", function() {
        gameSettings.failLimit = 3;

        storer = new eventStorer();
        storer.registerEvent(startSeries, orderReversed, 777);
        showNumbers(7,6,5,4,3,2,1);
        storer.registerEvent(endSeries, orderReversed, 777);
        storer.registerEvent(startTyping, orderReversed, 777);
        typeNumbers(1,2,3);
        storer.registerEvent(endTyping, orderReversed, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(0);
        expect(calculator.lastSeriesCorrectness).toBe(false)
        expect(calculator.lastSeriesFailed).toBe(false)
    });

    it("failLimit = 3, order = backwards, numbers entered = 9, series length = 7, first seven numbers correct => series is not considered a fail  ", function() {
        gameSettings.failLimit = 3;

        storer = new eventStorer();
        storer.registerEvent(startSeries, orderReversed, 777);
        showNumbers(7,6,5,4,3,2,1);
        storer.registerEvent(endSeries, orderReversed, 777);
        storer.registerEvent(startTyping, orderReversed, 777);
        typeNumbers(1,2,3,4,5,6,7,8,9);
        storer.registerEvent(endTyping, orderReversed, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(0);
        expect(calculator.lastSeriesCorrectness).toBe(false)
        expect(calculator.lastSeriesFailed).toBe(false)
    });

    it("failLimit = 3, order = backwards, numbers entered = 9, series length = 7, first two numbers correct => series is considered a fail  ", function() {
        gameSettings.failLimit = 3;

        storer = new eventStorer();
        storer.registerEvent(startSeries, orderReversed, 777);
        showNumbers(7,6,5,4,3,2,1);
        storer.registerEvent(endSeries, orderReversed, 777);
        storer.registerEvent(startTyping, orderReversed, 777);
        typeNumbers(1,2,4,5,6,7,8,9,0);
        storer.registerEvent(endTyping, orderReversed, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(0);
        expect(calculator.lastSeriesCorrectness).toBe(false)
        expect(calculator.lastSeriesFailed).toBe(true)
    });


    function showNumbers(){
        for(var i=0; i<arguments.length; i++){
            storer.registerEvent(showNumber, arguments[i], 777);
            storer.registerEvent(hideNumber, arguments[i], 777);
        }
    }

    function typeNumbers(){
        for(var i=0; i<arguments.length; i++){
            storer.registerEvent(keyDown, arguments[i]+48, 777);
            storer.registerEvent(keyUp, arguments[i]+48, 777);
        }

    }





});
 

