

describe("calculateResult ", function() {



    var n1 = 49;
    var n2 = 50;
    var n3 = 51;
    var n4 = 52;
    var n5 = 53;
    var n6 = 54;
    var n7 = 55;
    var n8 = 56;
    var n9 = 57
    var n0 = 48;
    var nx = 88;
    var startSeries = "EVENT_SHOWSERIES_START"
    var endSeries = "EVENT_SHOWSERIES_END"
    var gameEnd = "EVENT_GAME_END"


    beforeEach(function() {


    });


    it("numberOfShownSets correct when one set is shown ", function() {
        var storer = new eventStorer();
        storer.registerEvent(startSeries, "NORMAL", 777);
        storer.registerEvent(endSeries, "NORMAL", 888);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(1);
    });

    it("numberOfShownSets correct when two sets are shown ", function() {
        var storer = new eventStorer();
        storer.registerEvent(startSeries, "NORMAL", 777);
        storer.registerEvent(endSeries, "NORMAL", 888);
        storer.registerEvent(startSeries, "NORMAL", 999);
        storer.registerEvent(endSeries, "NORMAL", 1111);
        var calculator = new calculateResult(storer.getEvents(),199);
        expect(calculator.numberOfShownSeries).toBe(2);
    });



});
 

