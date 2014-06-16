

describe("GameDataTest", function() {


    var evHandler;
    var keyHandler;
    var game;



    var spaceKeyDownEvent;
    var spaceKeyUpEvent;
    var enterKeyDownEvent;
    var enterKeyUpEvent;

    var PracticeTotalTime;
    var gameData;
    var settings;

    beforeEach(function() {

        settings = {
            numberDisplayTime: 500,
            ISITime: 1500,
            guessTime: 5000,
            showResultTime: 5000,
            showCrossDelay: 1000,
            showCrossTime: 500,
            maxPracticeRounds: 3,
            maxFails : 2, //Number of failed series allowed before the series of that length are dropped out
            failLimit : 0, //Correct numbers required in a series for series not to be considered a major fail
            droppedSeriesMinLength : 6
        };

        evHandler = new eventHandler();
        keyHandler = new keyEventHandler(evHandler);




    });

    it("gameData constructor works", function() {
        var list = createNewList("u",1,2,3,"b",1,2,3,"u",1,6,7,"b",1,2,3,7,"u",1,2,6,7,"b",1,2,3,7);
        gameData = new GameData("GAME",list,settings)
        expect(gameData.getMode()).toEqual("GAME");
        expect(gameData.getNumberList()).toEqual(list);
        expect(gameData.getdonePracticeRounds()).toEqual(0);
        expect(gameData.numberDisplayTime).toEqual(settings.numberDisplayTime);
        expect(gameData.ISITime).toEqual(settings.ISITime);
        expect(gameData.guessTime).toEqual(settings.guessTime);
        expect(gameData.showResultTime).toEqual(settings.showResultTime);
        expect(gameData.showCrossDelay).toEqual(settings.showCrossDelay);
        expect(gameData.showCrossTime).toEqual(settings.showCrossTime);
        expect(gameData.maxPracticeRounds).toEqual(settings.maxPracticeRounds);
        expect(gameData.maxFails).toEqual(settings.maxFails);
        expect(gameData.failLimit).toEqual(settings.failLimit);
        expect(gameData.droppedSeriesMinLength).toEqual(settings.droppedSeriesMinLength);
    });

    it("setEventHandler works ", function() {
        var list = createNewList("u",1,2,3,4,5,6,7,"b",1,2,3,4,5,6,7,"u",1,2,3,4,5,6,7,"b",1,2,3,4,5,6,7,"u",1,2,3,4,5,6,7,"b",1,2,3,4,5,6,7);
        gameData = new GameData("GAME",list,settings)
        gameData.setEventHandler(evHandler);
        evHandler.triggerEvent("GAME_START","",0);
        expect(gameData.getEventHandler()).toEqual(evHandler);
    });

    it("addPracticeRound works ", function() {
        var list = createNewList("u",1,2,3,4,5,6,7,"b",1,2,3,4,5,6,7,"u",1,2,3,4,5,6,7,"b",1,2,3,4,5,6,7,"u",1,2,3,4,5,6,7,"b",1,2,3,4,5,6,7);
        gameData = new GameData("PRACTICE",list,settings)
        expect(gameData.getdonePracticeRounds()).toEqual(0);
        gameData.addDonePracticeRounds();
        expect(gameData.getdonePracticeRounds()).toEqual(1);
    });

    it(" getCurrentSeries works ", function() {
        var list = createNewList(   "u",1,2,3,4,5,6,7,
                                    "b",8,7,6,5,4,3,
                                    "u",2,3,4,5,6,7,
                                    "b",3,4,5,6,7,
                                    "u",4,5,6,7,
                                    "b",5,6,7);
        gameData = new GameData("PRACTICE",list,settings)
        var series = {
            numbers: [1,2,3,4,5,6,7],
            order: "upwards"
        };
        expect(gameData.getCurrentSeries()).toEqual(series)
    });

    it(" updateNumberListIndex works if no fails ", function() {
        var list = createNewList(   "u",1,2,3,4,5,6,7,
            "b",8,7,6,5,4,3,
            "u",1,2,3,4,5,6,7,
            "b",1,2,3,4,5,6,7,
            "u",1,2,3,4,5,6,7,
            "b",1,2,3,4,5,6,7);
        gameData = new GameData("PRACTICE",list,settings)
        var series = {
            numbers: [1,2,3,4,5,6,7],
            order: "upwards"
        };
        expect(gameData.getCurrentSeries()).toEqual(series)
        gameData.updateNumberListIndex();
        series.order = "backwards";
        series.numbers = [8,7,6,5,4,3];
        expect(gameData.getCurrentSeries()).toEqual(series)
    });

    it(" 7 number lists are skipped if maksimum number of fails is done and dropping series is possible", function() {
        settings.droppingSeriesPossible = true;
        var list = createNewList(   "u",1,2,3,4,5,6,7,
                                    "u",2,2,3,4,5,6,7,
                                    "u",3,2,3,4,5,6,7,
                                    "u",4,2,3,4,5,6,7,
                                    "u",5,2,3,4,5,6,7,
                                    "u",6,2,3,4,5,6,7,
                                    "u",9,8,7,6,5,4);
        gameData = new GameData("GAME",list,settings)
        gameData.droppedSeriesMinLength=6;
        gameData.maxFails=2;
        gameData.failLimit = 2;

        gameData.setEventHandler(mockEventHandlerLastFail(7));
        var series = {
            numbers: [1,2,3,4,5,6,7],
            order: "upwards"
        };
        expect(gameData.getCurrentSeries()).toEqual(series)

        for(var i = 0; i<settings.maxFails;i++){
            gameData.updateFails();
        }

        gameData.updateNumberListIndex();
        series.order = "upwards";
        series.numbers = [9,8,7,6,5,4];
        expect(gameData.getCurrentSeries()).toEqual(series)
    });

    it(" 7 number lists are not skipped if maksimum number of fails is done and dropping series is not possible", function() {
        settings.droppingSeriesPossible = false;
        var list = createNewList(   "u",1,2,3,4,5,6,7,
            "u",2,2,3,4,5,6,7,
            "u",3,2,3,4,5,6,7,
            "u",4,2,3,4,5,6,7,
            "u",5,2,3,4,5,6,7,
            "u",6,2,3,4,5,6,7,
            "u",9,8,7,6,5,4);
        gameData = new GameData("GAME",list,settings)
        gameData.droppedSeriesMinLength=6;
        gameData.maxFails=2;
        gameData.failLimit = 2;

        gameData.setEventHandler(mockEventHandlerLastFail(7));
        var series = {
            numbers: [1,2,3,4,5,6,7],
            order: "upwards"
        };
        expect(gameData.getCurrentSeries()).toEqual(series)

        for(var i = 0; i<settings.maxFails;i++){
            gameData.updateFails();
        }

        gameData.updateNumberListIndex();
        series.order = "upwards";
        series.numbers = [2,2,3,4,5,6,7];
        expect(gameData.getCurrentSeries()).toEqual(series)
    });

    function createNewList(){
        var list = [];
        var series;
        for(var i= 0; i<arguments.length; i++){
            if(arguments[i]=="u"){
                series = {};
                list.push(series);
                series.numbers = [];
                series.order="upwards"
            } else if(arguments[i]=="b"){
                series = {};
                list.push(series);
                series.numbers = [];
                series.order="backwards"
            } else if (arguments[i]>=0 && arguments[i]<10){
                series.numbers.push(arguments[i]);
            }
        }
        list.push(series)
        return list;
    }


    function mockEventHandlerLastSuccess(seriesLength){

        function getStoredEvents(){
            var events=[];
            events.push({eventtype:"EVENT_SHOWSERIES_START", value: "", timestamp: 100})
            for(var i = 0; i< seriesLength; i++){
                events.push({eventtype: "EVENT_SHOWNUMBER_START",value:i, timestamp:100});
                events.push({eventtype: "EVENT_SHOWNUMBER_END",value:i, timestamp:100});
            }
            events.push({eventtype:"EVENT_SHOWSERIES_END", value: "", timestamp: 100});
            events.push({eventtype:"EVENT_USERINPUT_START", value: "upwards", timestamp: 100});
            for(var i = 0; i< seriesLength; i++){
                events.push({eventtype: "EVENT_TYPE_KEYDOWN",value:i+48, timestamp:100});
                events.push({eventtype: "EVENT_TYPE_KEYUP",value:i+48, timestamp:100});
            }
            events.push({eventtype:"EVENT_USERINPUT_END", value: "upwards", timestamp: 100});
            return events;
        }
        return{
            getStoredEvents: getStoredEvents
        }
    }

    function mockEventHandlerLastFail(seriesLength){

        function getStoredEvents(){
            var events=[];
            events.push({eventtype:"EVENT_SHOWSERIES_START", value: "", timestamp: 100})
            for(var i = 0; i< seriesLength; i++){
                events.push({eventtype: "EVENT_SHOWNUMBER_START",value:i, timestamp:100});
                events.push({eventtype: "EVENT_SHOWNUMBER_END",value:i, timestamp:100});
            }
            events.push({eventtype:"EVENT_SHOWSERIES_END", value: "", timestamp: 100});
            events.push({eventtype:"EVENT_USERINPUT_START", value: "upwards", timestamp: 100});
            events.push({eventtype:"EVENT_USERINPUT_END", value: "upwards", timestamp: 100});
            return events;
        }
        return{
            getStoredEvents: getStoredEvents
        }
    }





});
