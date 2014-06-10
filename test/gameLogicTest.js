/**
 * Created by kristiak on 30.5.2014.
 */

describe("gameLogicTest", function() {



    var evHandler;
    var keyHandler;
    var game;

    var gameData;

    var spaceKeyDownEvent;
    var spaceKeyUpEvent;
    var enterKeyDownEvent;
    var enterKeyUpEvent;

    beforeEach(function() {
        $(document).off();
        evHandler = new eventHandler();
        keyHandler = new keyEventHandler(evHandler);
        game = new gameLogic(evHandler);

        gameData = {
            gameIdentifier: "ThisGame",
            numberDisplayTime: 500,
            ISITime: 1500,
            guessTime: 5000,
            showResultTime: 5000,
            numberList: undefined,
            numberListIndex: 0,
            result: undefined,
            mode: "PRACTICE",
            maxPracticeRounds: 3,
            donePracticeRounds: 0,
            gameStartTime : 0
        };

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
    });



    it("correct events in correct order are generated when playing one round of practice and then starting the actual game", function() {

        gameData.numberList = createMockList(3);
        gameData.mode = "PRACTICE";
        game.start(gameData);
        jasmine.clock().tick(10000);
        mockSpaceKeyDownAndUpEvent();
        jasmine.clock().tick(10000);
        mockSpaceKeyDownAndUpEvent();
        jasmine.clock().tick(10000);
        mockEnterKeyDownAndUpEvent();
        jasmine.clock().tick(10000);

        expect(gameData.donePracticeRounds).toBe(1);

        var events = evHandler.getStoredEvents();
        var index = 0;
        index = checkPracticeGameEvents(events, index, gameData, true);

        //index = checkForEvent(events, index, "EVENT_GAME_START");
    });


    it("correct events in correct order are generated when playing max rounds of practice and then starting the actual game", function() {

        gameData.numberList = createMockList(3);

        gameData.mode = "PRACTICE";

        game.start(gameData);
        jasmine.clock().tick(10000);

        for (var round = 0; round < gameData.maxPracticeRounds; round++) {
            mockSpaceKeyDownAndUpEvent();
            jasmine.clock().tick(10000);
            mockSpaceKeyDownAndUpEvent();
            jasmine.clock().tick(10000);
            mockSpaceKeyDownAndUpEvent();
            jasmine.clock().tick(10000);
            expect(gameData.donePracticeRounds).toBe(round + 1);
        }
        mockEnterKeyDownAndUpEvent();
        jasmine.clock().tick(10000);


        var events = evHandler.getStoredEvents();
        var index = 0;
        for (var round = 0; round < gameData.maxPracticeRounds; round++) {
            index = checkPracticeGameEvents(events, index, gameData, true);
        }

       // index = checkForEvent(events, index, "EVENT_GAME_START");

    });


    it("does not let user play more practice rounds than is allowed", function() {

        gameData.numberList = createMockList(3);

        gameData.mode = "PRACTICE";

        game.start(gameData);
        jasmine.clock().tick(10000);

        for (var round = 0; round < gameData.maxPracticeRounds; round++) {
            mockSpaceKeyDownAndUpEvent();
            jasmine.clock().tick(10000);
            mockSpaceKeyDownAndUpEvent();
            jasmine.clock().tick(10000);
            mockSpaceKeyDownAndUpEvent();
            jasmine.clock().tick(10000);
            expect(gameData.donePracticeRounds).toBe(round + 1);
        }
        mockSpaceKeyDownAndUpEvent();
        jasmine.clock().tick(10000);
        expect(gameData.donePracticeRounds).toBe(gameData.maxPracticeRounds);


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

        gameData.numberList = createMockList(15);
        gameData.mode = "GAME";
        game.start(gameData);
        jasmine.clock().tick(100000);

        var events = evHandler.getStoredEvents();
        //console.log(events);
        var index = 0;
        index = checkGameEvents(events, index, gameData, false);

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

        for (var i = 0; i < gameData.numberList.length; i++) {
            var series = gameData.numberList[i];
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

        for (var i = 0; i < gameData.numberList.length; i++) {
            var series = gameData.numberList[i];
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

        //console.log(events[index].eventtype);
        expect(index).toBeLessThan(events.length);
        expect(events[index].eventtype).toBe(eventType);

        return index + 1;

    }

    function checkForEventAndValue(events, index, eventType, value) {

        index = skipKeyEvents(events, index);

        //console.log(events[index].eventtype);
        expect(index).toBeLessThan(events.length);
        expect(events[index].eventtype).toBe(eventType);
        expect(events[index].value).toBe(value);

        return index + 1;

    }




});