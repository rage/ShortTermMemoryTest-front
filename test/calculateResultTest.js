

describe("calculateResult ", function() {



    var n1 = 49;
    var n2 = 50;
    var n3 = 51;
    var n4 = 52;
    var n5 = 53;
    var n6 = 54;
    var n7 = 55;
    var n8 = 56;
    var n9 = 57;
    var n0 = 48;
    var nx = 88;
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
        storer.registerEvent(1,startSeries, orderNormal, 777);
        storer.registerEvent(1,endSeries, orderNormal, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
    });

   it("numberOfShownSets correct when two sets are shown ", function() {
        storer = new eventStorer();
        storer.registerEvent(1,startSeries, orderNormal, 777);
        storer.registerEvent(1,endSeries, orderNormal, 777);
        storer.registerEvent(1,startSeries, orderNormal, 777);
        storer.registerEvent(1,endSeries, orderNormal, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(2);
    });

    it("correct result when one 3-number set and correct answer is given ", function() {
        storer = new eventStorer();
        storer.registerEvent(1,startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(1,endSeries, orderNormal, 777);
        storer.registerEvent(1,startTyping, orderNormal, 777);
        typeNumbers(n7,n8,n5);
        storer.registerEvent(1,endTyping, orderNormal, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(1);
        expect(calculator.lastSeriesCorrectness).toBe(true)
    });


    it("correct result when one 3-number backwards-set and correct answer is given ", function() {
        storer = new eventStorer();
        storer.registerEvent(1,startSeries, orderReversed, 777);
        showNumbers(7,8,5);
        storer.registerEvent(1,endSeries, orderReversed, 777);
        storer.registerEvent(1,startTyping, orderReversed, 777);
        typeNumbers(n5,n8,n7);
        storer.registerEvent(1,endTyping, orderReversed, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(1);
        expect(calculator.lastSeriesCorrectness).toBe(true)
    });

    it("correct result when one 6-number backwards-set and correct answer is given ", function() {
        storer = new eventStorer();
        storer.registerEvent(1,startSeries, orderReversed, 777);
        showNumbers(7,8,5,6,4,2);
        storer.registerEvent(1,endSeries, orderReversed, 777);
        storer.registerEvent(1,startTyping, orderReversed, 777);
        typeNumbers(n2, n4, n6, n5, n8, n7);
        storer.registerEvent(1,endTyping, orderReversed, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(1);
        expect(calculator.lastSeriesCorrectness).toBe(true)
    });

    it("incorrect answer when one 3-number set and one the last number is typed after deadline ", function() {
        storer = new eventStorer();
        storer.registerEvent(1,startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(1,endSeries, orderNormal, 777);
        storer.registerEvent(1,startTyping, orderNormal, 777);
        typeNumbers(n7,n8);
        storer.registerEvent(1,endTyping, orderNormal, 777);
        typeNumbers(n5);
        var calculator = new calculateResult(storer.getEvents(),199);
        console.log(storer.getEvents());
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(0);
        expect(calculator.lastSeriesCorrectness).toBe(false)
    });

    it("incorrect answer when one 3-number set and one extra number is given ", function() {
        storer = new eventStorer();
        storer.registerEvent(1,startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(1,endSeries, orderNormal, 777);
        storer.registerEvent(1,startTyping, orderNormal, 777);
        typeNumbers(n7,n8,n5, n5);
        storer.registerEvent(1,endTyping, orderNormal, 777);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(0);
        expect(calculator.lastSeriesCorrectness).toBe(false)
    });

    it("correct answer when one 3-number set and one extra number is given after deadline ", function() {
        storer = new eventStorer();
        storer.registerEvent(1,startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(1,endSeries, orderNormal, 777);
        storer.registerEvent(1,startTyping, orderNormal, 777);
        typeNumbers(n7,n8,n5);
        storer.registerEvent(1,endTyping, orderNormal, 777);
        typeNumbers(n5);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(1);
        expect(calculator.lastSeriesCorrectness).toBe(true)
    });

    it("incorrect answer when one 3-number set and the first number is missing from answer ", function() {
        storer = new eventStorer();
        storer.registerEvent(1,startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(1,endSeries, orderNormal, 777);
        storer.registerEvent(1,startTyping, orderNormal, 777);
        typeNumbers(n8,n5);
        storer.registerEvent(1,endTyping, orderNormal, 777);
        typeNumbers(n5);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
        expect(calculator.numberOfCorrectGivenSeries).toBe(0);
        expect(calculator.lastSeriesCorrectness).toBe(false)
    });

    it("correct answers when two 3-number sets and both answers are correct", function() {
        storer = new eventStorer();
        storer.registerEvent(1,startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(1,endSeries, orderNormal, 777);
        storer.registerEvent(1,startTyping, orderNormal, 777);
        typeNumbers(n7,n8,n5);
        storer.registerEvent(1,endTyping, orderNormal, 777);

        storer.registerEvent(1,startSeries, orderNormal, 777);
        showNumbers(1,2,3);
        storer.registerEvent(1,endSeries, orderNormal, 777);
        storer.registerEvent(1,startTyping, orderNormal, 777);
        typeNumbers(n1,n2,n3);
        storer.registerEvent(1,endTyping, orderNormal, 777);

        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(2);
        expect(calculator.numberOfCorrectGivenSeries).toBe(2);
        expect(calculator.lastSeriesCorrectness).toBe(true)
    });

    it("one correct and one incorrect answer when two 3-number sets and the first answer is correct", function() {
        storer = new eventStorer();
        storer.registerEvent(1,startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(1,endSeries, orderNormal, 777);
        storer.registerEvent(1,startTyping, orderNormal, 777);
        typeNumbers(n7,n8,n5);
        storer.registerEvent(1,endTyping, orderNormal, 777);

        storer.registerEvent(1,startSeries, orderNormal, 777);
        showNumbers(1,2,3);
        storer.registerEvent(1,endSeries, orderNormal, 777);
        storer.registerEvent(1,startTyping, orderNormal, 777);
        typeNumbers(n1,n2,n4);
        storer.registerEvent(1,endTyping, orderNormal, 777);

        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(2);
        expect(calculator.numberOfCorrectGivenSeries).toBe(1);
        expect(calculator.lastSeriesCorrectness).toBe(false)
    });

    it("one correct and one incorrect answer when two 3-number sets and the second answer is correct", function() {
        storer = new eventStorer();
        storer.registerEvent(1,startSeries, orderNormal, 777);
        showNumbers(7,8,5);
        storer.registerEvent(1,endSeries, orderNormal, 777);
        storer.registerEvent(1,startTyping, orderNormal, 777);
        typeNumbers(n7,n8,n2);
        storer.registerEvent(1,endTyping, orderNormal, 777);

        storer.registerEvent(1,startSeries, orderNormal, 777);
        showNumbers(1,2,3);
        storer.registerEvent(1,endSeries, orderNormal, 777);
        storer.registerEvent(1,startTyping, orderNormal, 777);
        typeNumbers(n1,n2,n3);
        storer.registerEvent(1,endTyping, orderNormal, 777);

        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(2);
        expect(calculator.numberOfCorrectGivenSeries).toBe(1);
        expect(calculator.lastSeriesCorrectness).toBe(true)
    });




    function showNumbers(){
        for(var i=0; i<arguments.length; i++){
            storer.registerEvent(showNumber, arguments[i], 777);
            storer.registerEvent(hideNumber, arguments[i], 777);
        }
    }

    function typeNumbers(){
        for(var i=0; i<arguments.length; i++){
            storer.registerEvent(keyDown, arguments[i], 777);
            storer.registerEvent(keyUp, arguments[i], 777);
        }

    }





});
 

