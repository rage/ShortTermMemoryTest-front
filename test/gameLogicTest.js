/**
 * Created by kristiak on 30.5.2014.
 */

describe("gameLogicTest", function() {



    var evHandler;
    var keyHandler;
    var game;
    var user;
    var gameData;

    var spaceKeyDownEvent;
    var spaceKeyUpEvent;
    var enterKeyDownEvent;
    var enterKeyUpEvent;

    var PracticeTotalTime;

    beforeEach(function() {

        var settings = new Settings();
        settings.game.numberDisplayTime = 500;
        settings.game.ISITime = 1500;
        settings.game.guessTime = 5000;
        settings.game.showResultTime = 5000000;
        settings.game.showCrossDelay = 1000;
        settings.game.showCrossTime = 500;
        settings.game.maxPracticeRounds = 3;
        settings.game.maxFails = 999; //Number of failed series allowed before the series of that length are dropped out
        settings.game.failLimit = 0; //Correct numbers required in a series for series not to be considered a major fail
        settings.game.droppedSeriesMinLength = 999;

        PracticeTotalTime = 10*settings.game.ISITime+settings.game.guessTime+settings.game.showCrossDelay+settings.game.showCrossTime+1000;


//        maxFails = 999; //Number of failed series allowed before the series of that length are dropped out
//        failLimit = 0; //Correct numbers required in a series for series not to be considered a major fail
//        droppedSeriesMinLength = 999;

        $(document).off();
        evHandler = new EventHandler();
        keyHandler = new KeyEventHandler(evHandler);
        user = new User();
        game = new GameLogic(evHandler, user, settings);

        gameData = new GameData("PRACTICE", undefined, settings);

//        {
//            gameIdentifier: "ThisGame",
//            numberDisplayTime: 500,
//            ISITime: 1500,
//            guessTime: 5000,
//            showResultTime: 5000,
//            numberList: undefined,
//            numberListIndex: 0,
//            result: undefined,
//            mode: "PRACTICE",
//            maxPracticeRounds: 3,
//            donePracticeRounds: 0,
//            gameStartTime : 0,
//            fails: [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
//            updateFails: function(EventHandler){
//                var fail = new CalculateResult(EventHandler.getStoredEvents(), 0).lastSeriesFailed;
//                var seriesLength = this.numberList[this.numberListIndex].numbers.length;
//                if (fail && seriesLength >= droppedSeriesMinLength) {
//                    this.fails[seriesLength]++;
//                } else {
//                    this.fails[seriesLength]=0;
//                }
//            },
//            updateNumberListIndex: function() {
//                this.numberListIndex++;
//                while (this.numberListIndex < this.numberList.length && this.fails[this.numberList[this.numberListIndex].numbers.length] > maxFails) {
//                    this.numberListIndex++;
//                }
//            }
//        };

        jasmine.clock().install();

        spaceKeyDownEvent = jQuery.Event("keydown");
        spaceKeyDownEvent.keyCode = 32;
        spaceKeyUpEvent = jQuery.Event("keyup");
        spaceKeyUpEvent.keyCode = 32;

        enterKeyDownEvent = jQuery.Event("keydown");
        enterKeyDownEvent.keyCode = 13;
        enterKeyUpEvent = jQuery.Event("keyup");
        enterKeyUpEvent.keyCode = 13;

    });

    afterEach(function() {
        var events = evHandler.getStoredEvents();
        checkEventTimings(events);
        $(document).off();
    });



    it("correct events in correct order are generated when playing one round of practice and then starting the actual game", function() {

        gameData.setNumberList(createMockList(3));
        gameData.setMode("PRACTICE");
        game.start(gameData);
        jasmine.clock().tick(PracticeTotalTime);
        mockSpaceKeyDownAndUpEvent();
        jasmine.clock().tick(PracticeTotalTime);
        mockSpaceKeyDownAndUpEvent();
        jasmine.clock().tick(PracticeTotalTime);
        mockEnterKeyDownAndUpEvent();
        jasmine.clock().tick(PracticeTotalTime);

        expect(gameData.getdonePracticeRounds()).toBe(1);

        var events = evHandler.getStoredEvents();
        var index = 0;
        index = checkPracticeGameEvents(events, index, gameData, true);

        //index = checkForEvent(events, index, "EVENT_GAME_START");
    });


    it("correct events in correct order are generated when playing max rounds of practice and then starting the actual game", function() {

        gameData.setNumberList(createMockList(3));

        gameData.setMode("PRACTICE");

        game.start(gameData);
        jasmine.clock().tick(PracticeTotalTime);

        for (var round = 0; round < gameData.maxPracticeRounds; round++) {
            mockSpaceKeyDownAndUpEvent();
            jasmine.clock().tick(PracticeTotalTime);
            mockSpaceKeyDownAndUpEvent();
            jasmine.clock().tick(PracticeTotalTime);
            mockSpaceKeyDownAndUpEvent();
            jasmine.clock().tick(PracticeTotalTime);
            expect(gameData.getdonePracticeRounds()).toBe(round + 1);
        }
        mockEnterKeyDownAndUpEvent();
        jasmine.clock().tick(PracticeTotalTime);


        var events = evHandler.getStoredEvents();
        var index = 0;

        for (var round = 0; round < gameData.maxPracticeRounds; round++) {
            index = checkPracticeGameEvents(events, index, gameData, true);
        }

       // index = checkForEvent(events, index, "EVENT_GAME_START");

    });



    it("does not let user play more practice rounds than is allowed", function() {

        gameData.setNumberList(createMockList(3));

        gameData.setMode("PRACTICE");

        game.start(gameData);
        jasmine.clock().tick(PracticeTotalTime);

        for (var round = 0; round < gameData.maxPracticeRounds; round++) {
            mockSpaceKeyDownAndUpEvent();
            jasmine.clock().tick(PracticeTotalTime);
            mockSpaceKeyDownAndUpEvent();
            jasmine.clock().tick(PracticeTotalTime);
            mockSpaceKeyDownAndUpEvent();
            jasmine.clock().tick(PracticeTotalTime);
            expect(gameData.getdonePracticeRounds()).toBe(round + 1);
        }
        mockSpaceKeyDownAndUpEvent();
        jasmine.clock().tick(PracticeTotalTime);
        expect(gameData.getdonePracticeRounds()).toBe(gameData.maxPracticeRounds);


        var events = evHandler.getStoredEvents();
        var index = 0;
        for (var round = 0; round < gameData.maxPracticeRounds - 1; round++) {
            index = checkPracticeGameEvents(events, index, gameData, true);
        }
        index = checkPracticeGameEvents(events, index, gameData, false);
        index = skipKeyEvents(events, index);
        expect(index).toBe(events.length);


    });


    it("correct events in correct order are generated when playing game in game mode", function() {

        gameData.setNumberList(createMockList(15));

        gameData.setMode("GAME");
        game.start(gameData);
        jasmine.clock().tick(15*(10*gameData.ISITime+gameData.guessTime));

        var events = evHandler.getStoredEvents();

        var index = 0;
        index = checkGameEvents(events, index, gameData, false);

    });


    it("numbers are shown on screen correctly in game mode", function() {

        gameData.setNumberList(createMockList(15));
        gameData.setMode("GAME");

        game.start(gameData);
        do {
            jasmine.clock().tick(10);
            var events = evHandler.getStoredEvents();
            lastEvent = events[events.length-1];
            if (lastEvent.eventtype == "EVENT_SHOWNUMBER_START") {
                expect($("#num_field").text()).toBe(lastEvent.value.toString());
                expect($("#num_field").text()).not.hidden;
            } else if (lastEvent.eventtype == "EVENT_SHOWNUMBER_END") {
                expect($("#num_field").text()).hidden;
            }
        } while (lastEvent.eventtype != "EVENT_SHOWRESULT_START")

    });

    it("cross is shown on screen correctly in game mode", function() {

        gameData.setNumberList(createMockList(15));
        gameData.setMode("GAME");

        game.start(gameData);
        do {
            jasmine.clock().tick(10);
            var events = evHandler.getStoredEvents();
            lastEvent = events[events.length-1];
            if (lastEvent.eventtype == "EVENT_SHOWCROSS_START") {
                expect($("#num_field").text()).toBe("+");
                expect($("#num_field").text()).not.hidden;
            } else if (lastEvent.eventtype == "EVENT_SHOWCROSS_END") {
                expect($("#num_field").text()).hidden;
            }
        } while (lastEvent.eventtype != "EVENT_SHOWRESULT_START");

    });


    it("a correct result is generated from correct mock input", function() {
        evHandler.registerEventHandler("EVENT_USERINPUT_START", function () {
            var keyDownEvent = jQuery.Event("keydown");
            var keyUpEvent = jQuery.Event("keyup");
            var series = gameData.getCurrentSeries();
            for (var i = 0; i < series.numbers.length; i++) {
                if (series.order == "upwards") {
                    keyDownEvent.keyCode = parseInt(series.numbers[i]) + 48;
                    keyUpEvent.keyCode = parseInt(series.numbers[i]) + 48;
                } else {
                    keyDownEvent.keyCode = parseInt(series.numbers[series.numbers.length - i - 1]) + 48;
                    keyUpEvent.keyCode = parseInt(series.numbers[series.numbers.length - i - 1]) + 48;
                }
                $(document).trigger(keyDownEvent);
                jasmine.clock().tick(10);
                $(document).trigger(keyUpEvent);
                jasmine.clock().tick(10);
            }
        });

        gameData.setNumberList(createMockList(15));
        gameData.setMode("GAME");

        game.start(gameData);
        jasmine.clock().tick(15*(10*gameData.ISITime+gameData.guessTime));
        var events = evHandler.getStoredEvents();
        var settings = new Settings();
        var result = CalculateResult(events, 0, settings);
        expect(result.numberOfCorrectGivenSeries).toBe(result.numberOfShownSeries);

    });


    it("a correct result is generated from correct mock input and not affected by user input outside the guess time", function() {
        evHandler.registerEventHandler("EVENT_USERINPUT_START", function () {
            var keyDownEvent = jQuery.Event("keydown");
            var keyUpEvent = jQuery.Event("keyup");
            var series = gameData.getCurrentSeries();
            for (var i = 0; i < series.numbers.length; i++) {
                if (series.order == "upwards") {
                    keyDownEvent.keyCode = parseInt(series.numbers[i]) + 48;
                    keyUpEvent.keyCode = parseInt(series.numbers[i]) + 48;
                } else {
                    keyDownEvent.keyCode = parseInt(series.numbers[series.numbers.length - i - 1]) + 48;
                    keyUpEvent.keyCode = parseInt(series.numbers[series.numbers.length - i - 1]) + 48;
                }
                $(document).trigger(keyDownEvent);
                jasmine.clock().tick(10);
                $(document).trigger(keyUpEvent);
                jasmine.clock().tick(10);
            }
        });


        evHandler.registerEventHandler("EVENT_SHOWCROSS_START", function () {
            var keyDownEvent = jQuery.Event("keydown");
            var keyUpEvent = jQuery.Event("keyup");
            var additionalInput =  Math.floor(Math.random() * 10);
            if (additionalInput == 1) {
                keyDownEvent.keyCode = Math.floor(Math.random() * 100) + 1;
                keyUpEvent.keyCode = keyDownEvent.keyCode
            }

            $(document).trigger(keyDownEvent);
            jasmine.clock().tick(10);
            $(document).trigger(keyUpEvent);
            jasmine.clock().tick(10);

        });

        evHandler.registerEventHandler("EVENT_SHOWNUMBER_START", function () {
            var keyDownEvent = jQuery.Event("keydown");
            var keyUpEvent = jQuery.Event("keyup");
            var additionalInput =  Math.floor(Math.random() * 10);
            if (additionalInput == 1) {
                keyDownEvent.keyCode = Math.floor(Math.random() * 100) + 1;
                keyUpEvent.keyCode = keyDownEvent.keyCode
            }

            $(document).trigger(keyDownEvent);
            jasmine.clock().tick(10);
            $(document).trigger(keyUpEvent);
            jasmine.clock().tick(10);

        });

        gameData.setNumberList(createMockList(1));
        gameData.setMode("GAME");

        game.start(gameData);
        jasmine.clock().tick(100000);
        var events = evHandler.getStoredEvents();
        var settings = new Settings();
        var result = CalculateResult(events, 0, settings);
        expect(result.numberOfCorrectGivenSeries).toBe(result.numberOfShownSeries);

    });














    it("an incorrect result is generated from incorrect mock input", function() {
        evHandler.registerEventHandler("EVENT_USERINPUT_START", function () {
            var keyDownEvent = jQuery.Event("keydown");
            var keyUpEvent = jQuery.Event("keyup");
            var series = gameData.getCurrentSeries();
            for (var i = 0; i < series.numbers.length; i++) {
                if (series.order == "upwards") {
                    keyDownEvent.keyCode = parseInt(series.numbers[i]) + 48;
                    keyUpEvent.keyCode = parseInt(series.numbers[i]) + 48;
                } else {
                    keyDownEvent.keyCode = parseInt(series.numbers[series.numbers.length - i - 1]) + 48;
                    keyUpEvent.keyCode = parseInt(series.numbers[series.numbers.length - i - 1]) + 48;
                }
                var messWithInput =  Math.floor(Math.random() * 2);
                if (messWithInput == 1) {
                    keyDownEvent.keyCode = Math.floor(Math.random() * 9) + 1 + 48;
                    keyUpEvent.keyCode = Math.floor(Math.random() * 9) + 1 + 48;
                }

                $(document).trigger(keyDownEvent);
                jasmine.clock().tick(10);
                $(document).trigger(keyUpEvent);
                jasmine.clock().tick(10);
            }
        });

        gameData.setNumberList(createMockList(15));
        gameData.setMode("GAME");

        game.start(gameData);
        var timecounter = new countTimes(gameData);
        jasmine.clock().tick(timecounter.totalListShowTime()+gameData.showResultTime/2);
        var events = evHandler.getStoredEvents();
        var settings = new Settings();
        var result = CalculateResult(events, 0, settings);
        expect(result.numberOfCorrectGivenSeries).not.toBe(result.numberOfShownSeries);

    });




    function checkShowCrossTiming(event1, event2) {
        expect(event1.eventtype).toBe("EVENT_SHOWCROSS_START");
        expect(event2.eventtype).toBe("EVENT_SHOWCROSS_END");
        var showCrossTime = event2.timestamp - event1.timestamp;
        expect(showCrossTime).toBe(gameData.showCrossTime);
    }

    function checkShowNumberTiming(event1, event2) {
        expect(event1.eventtype).toBe("EVENT_SHOWNUMBER_START");
        expect(event2.eventtype).toBe("EVENT_SHOWNUMBER_END");
        var showNumberTime = event2.timestamp - event1.timestamp;
        expect(showNumberTime).toBe(gameData.numberDisplayTime);
    }

    function checkUserInputTiming(event1, event2) {
        expect(event1.eventtype).toBe("EVENT_USERINPUT_START");
        expect(event2.eventtype).toBe("EVENT_USERINPUT_END");
        var guessTime = event2.timestamp - event1.timestamp;
        expect(guessTime).toBe(gameData.guessTime);
    }

    function checkUserInputTiming(event1, event2) {
        expect(event1.eventtype).toBe("EVENT_SHOWCROSS_END");
        expect(event2.eventtype).toBe("EVENT_SHOWNUMBER_START");
        var delay = event2.timestamp - event1.timestamp;
        expect(delay).toBe(gameData.ISITime - gameData.numberDisplayTime);
    }

    function checkBetweenNumbersDelay(event1, event2) {
        if (event1.eventtype == "EVENT_SHOWNUMBER_END" && event1.eventtype == "EVENT_SHOWNUMBER_START") {
            var delay = event2.timestamp - event1.timestamp;
            expect(delay).toBe(gameData.ISITime - gameData.numberDisplayTime);
        } else if (event1.eventtype == "EVENT_SHOWNUMBER_END" && event1.eventtype == "EVENT_SHOWSERIES_END") {
            var delay = event2.timestamp - event1.timestamp;
            expect(delay).toBe(gameData.ISITime - gameData.numberDisplayTime);
        }
    }


    function checkTiming(event1, event2) {
        switch (event1.eventtype) {
            case "EVENT_SHOWCROSS_START":
                checkShowCrossTiming(event1, event2);
                break;
            case "EVENT_SHOWNUMBER_START":
                checkShowNumberTiming(event1, event2);
                break;
            case "EVENT_USERINPUT_START":
                checkUserInputTiming(event1, event2);
                break;
            case "EVENT_SHOWCROSS_END":
                checkShowCrossEndDelay(event1, event2);
                break;
            case "EVENT_SHOWNUMBER_END":
                checkBetweenNumbersDelay(event1, event2);
                break;
        }
    }


    function checkEventTimings(events) {
        var index = 0;
        while (index < events.length) {
            var index1 = skipKeyEvents(events, index);
            var event1 = events[index1];
            var index2 = skipKeyEvents(events, index1);
            var event2 = events[index2];
            if (index1 != index2) {
                checkTiming(event1, event2);
            }
            index = index1 + 1;
        }
    }


    function checkForPracticeSeriesEvents(events, index, series) {

        index = checkForEvent(events, index, "EVENT_SHOWSERIES_START");
        index = checkForEvent(events, index, "EVENT_SHOWCROSS_START");
        index = checkForEvent(events, index, "EVENT_SHOWCROSS_END");

        for (var i = 0; i < series.numbers.length; i++) {
            var number = series.numbers[i];
            index = checkForEvent(events, index, "EVENT_SHOWNUMBER_START", number);
            index = checkForEvent(events, index, "EVENT_SHOWNUMBER_END", number);
        }
        index = checkForEvent(events, index, "EVENT_SHOWSERIES_END");
        index = checkForEvent(events, index, "EVENT_USERINPUT_START");
        index = checkForEvent(events, index, "EVENT_USERINPUT_END");
        index = checkForEvent(events, index, "EVENT_SHOW_PRACTICE_RESULT_START")

        return index;

    }


    function checkPracticeGameEvents(events, index, gameData, checkEnd) {
        index = checkForEvent(events, index, "EVENT_PRACTICE_GAME_START");
        index = checkForEvent(events, index, "EVENT_SHOWLIST_START");

        for (var i = 0; i < gameData.getNumberList().length; i++) {
            var series = gameData.getNumberList()[i];
            index = checkForPracticeSeriesEvents(events, index, series);
        }

        if (checkEnd == true) {
            index = checkForEvent(events, index, "EVENT_PRACTICE_GAME_END");
        }

        return index;
    }



    function checkForGameSeriesEvents(events, index, series) {

        index = checkForEvent(events, index, "EVENT_SHOWSERIES_START");
        index = checkForEvent(events, index, "EVENT_SHOWCROSS_START");
        index = checkForEvent(events, index, "EVENT_SHOWCROSS_END");

        for (var i = 0; i < series.numbers.length; i++) {
            var number = series.numbers[i];
            index = checkForEvent(events, index, "EVENT_SHOWNUMBER_START", number);
            index = checkForEvent(events, index, "EVENT_SHOWNUMBER_END", number);
        }
        index = checkForEvent(events, index, "EVENT_SHOWSERIES_END");
        index = checkForEvent(events, index, "EVENT_USERINPUT_START");
        index = checkForEvent(events, index, "EVENT_USERINPUT_END");
        //index = checkForEvent(events, index, "EVENT_SHOW_PRACTICE_RESULT_START")

        return index;

    }


    function checkGameEvents(events, index, gameData, checkEnd) {
        index = checkForEvent(events, index, "EVENT_GAME_START");
        index = checkForEvent(events, index, "EVENT_SHOWLIST_START");

        for (var i = 0; i < gameData.getNumberList().length; i++) {
            var series = gameData.getNumberList()[i];
            index = checkForGameSeriesEvents(events, index, series);
        }

        index = checkForEvent(events, index, "EVENT_SHOWLIST_END")
        index = checkForEvent(events, index, "EVENT_SHOWRESULT_START");



        if (checkEnd == true) {
            index = checkForEvent(events, index, "EVENT_GAME_END");
        }

        return index;
    }



    function createMockList(numberOfSeriesToCreate) {
        var list = [];
        for (var i = 0; i < numberOfSeriesToCreate; i++) {
            var series = {};
            series.numbers = [];
            var numbersInSeries = Math.floor(Math.random() * 7) + 1;
            for (var j = 0; j < numbersInSeries; j++) {
                var number = Math.floor(Math.random() * 9) + 1;
                series.numbers[j] = number;
            }
            var order = Math.floor(Math.random() * 2);
            if (order == 0) {
                series.order = "upwards";
            } else {
                series.order = "backwards";
            }
            list[i] = series;
        }
        return list;
    }



    function mockSpaceKeyDownAndUpEvent() {
        $(document).trigger(spaceKeyDownEvent);
        $(document).trigger(spaceKeyUpEvent);
    }

    function mockEnterKeyDownAndUpEvent() {
        $(document).trigger(enterKeyDownEvent);
        $(document).trigger(enterKeyUpEvent);
    }





    function skipKeyEvents(events, index) {
        while (index < events.length) {
            if (events[index].eventtype == "EVENT_TYPE_KEYDOWN" || events[index].eventtype == "EVENT_TYPE_KEYUP") {
                index++;
                continue;
            } else {
                break;
            }
        }
        return index;
    }

    function checkForEvent(events, index, eventType) {

        index = skipKeyEvents(events, index);

        expect(index).toBeLessThan(events.length);
        expect(events[index].eventtype).toBe(eventType);

        return index + 1;

    }

    function checkForEventAndValue(events, index, eventType, value) {

        index = skipKeyEvents(events, index);

        expect(index).toBeLessThan(events.length);
        expect(events[index].eventtype).toBe(eventType);
        expect(events[index].value).toBe(value);

        return index + 1;

    }

    function countTimes(gameData) {

        var list = gameData.getNumberList();
        function seriesShowTime(index){
            var n=list[index].numbers.length;
            var numbersTime= n*gameData.ISITime;
            var crossTime = gameData.showCrossDelay+gameData.showCrossDelay;
            return numbersTime+crossTime;
        }


        function totalListShowTime(){
            var totalTime = 0;
            for(var i= 0; i<list.length; i++){
                totalTime = totalTime+seriesShowTime(i);
                totalTime = totalTime+gameData.guessTime;
            }
            return totalTime;
        }

        return{
            seriesShowTime: seriesShowTime,
            totalListShowTime: totalListShowTime
        }

    }




});