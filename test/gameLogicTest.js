/**
 * Created by kristiak on 30.5.2014.
 */
var username;

describe("gameLogicTest", function() {



    var evHandler;
    var keyHandler;
    var game;

    var gameData;

    var spaceKeyDownEvent;
    var spaceKeyUpEvent;

    beforeEach(function() {
        $(document).off();
        evHandler = new eventHandler();
        keyHandler = new keyEventHandler(evHandler);
        game = new gameLogic(evHandler);

        username = CreateRandomTestUser();

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

    it("starts the practice game and the correct events are triggered", function() {

        var list = new GetList();
        var list = list.getNextList();
        var testList = [];
        for (i = 0; i < 3; i++) {
            testList[i] = list[i];
        }
        gameData.numberList = testList;

        gameData.mode = "PRACTICE";
        game.start(gameData);
        jasmine.clock().tick(10000);

        var events = evHandler.getStoredEvents();
        var index = 0;
        expect(events[index++].eventtype).toBe("EVENT_PRACTICE_GAME_START");
        expect(events[index++].eventtype).toBe("EVENT_SHOWLIST_START");
        expect(events[index++].eventtype).toBe("EVENT_SHOWSERIES_START");
        expect(events[index++].eventtype).toBe("EVENT_SHOWCROSS_START");
        expect(events[index++].eventtype).toBe("EVENT_SHOWCROSS_END");

        expect(events[index].eventtype).toBe("EVENT_SHOWNUMBER_START");
        expect(events[index].value).toBe(5);
        index++;

        expect(events[index].eventtype).toBe("EVENT_SHOWNUMBER_END");
        expect(events[index].value).toBe(5);
        index++;

        expect(events[index].eventtype).toBe("EVENT_SHOWNUMBER_START");
        expect(events[index].value).toBe(7);
        index++;

        expect(events[index].eventtype).toBe("EVENT_SHOWNUMBER_END");
        expect(events[index].value).toBe(7);
        index++;

        expect(events[index].eventtype).toBe("EVENT_SHOWNUMBER_START");
        expect(events[index].value).toBe(3);
        index++;

        expect(events[index].eventtype).toBe("EVENT_SHOWNUMBER_END");
        expect(events[index].value).toBe(3);
        index++;

        expect(events[index].eventtype).toBe("EVENT_SHOWNUMBER_START");
        expect(events[index].value).toBe(8);
        index++;

        expect(events[index].eventtype).toBe("EVENT_SHOWNUMBER_END");
        expect(events[index].value).toBe(8);
        index++;

        expect(events[index++].eventtype).toBe("EVENT_SHOWSERIES_END");
        expect(events[index++].eventtype).toBe("EVENT_USERINPUT_START");
        expect(events[index++].eventtype).toBe("EVENT_USERINPUT_END");
        expect(events[index++].eventtype).toBe("EVENT_SHOW_PRACTICE_RESULT_START");

        expect(index).toBe(events.length);

        $(document).trigger(spaceKeyDownEvent);
        jasmine.clock().tick(10000);

        events = evHandler.getStoredEvents();
        expect(events[index++].eventtype).toBe("EVENT_TYPE_KEYDOWN");
        expect(events[index++].eventtype).toBe("EVENT_SHOWSERIES_START");
        expect(events[index++].eventtype).toBe("EVENT_SHOWCROSS_START");
        expect(events[index++].eventtype).toBe("EVENT_SHOWCROSS_END");
        expect(events[index++].eventtype).toBe("EVENT_SHOWNUMBER_START");
        expect(events[index++].eventtype).toBe("EVENT_SHOWNUMBER_END");
        expect(events[index++].eventtype).toBe("EVENT_SHOWNUMBER_START");
        expect(events[index++].eventtype).toBe("EVENT_SHOWNUMBER_END");
        expect(events[index++].eventtype).toBe("EVENT_SHOWNUMBER_START");
        expect(events[index++].eventtype).toBe("EVENT_SHOWNUMBER_END");
        expect(events[index++].eventtype).toBe("EVENT_SHOWSERIES_END");
        expect(events[index++].eventtype).toBe("EVENT_USERINPUT_START");
        expect(events[index++].eventtype).toBe("EVENT_USERINPUT_END");
        expect(events[index++].eventtype).toBe("EVENT_SHOW_PRACTICE_RESULT_START");
        expect(index).toBe(events.length);


        $(document).trigger(spaceKeyUpEvent);
        events = evHandler.getStoredEvents();
        expect(events[index++].eventtype).toBe("EVENT_TYPE_KEYUP");

        expect(index).toBe(events.length);

        $(document).trigger(spaceKeyDownEvent);
        jasmine.clock().tick(10000);

        events = evHandler.getStoredEvents();
        expect(events[index++].eventtype).toBe("EVENT_TYPE_KEYDOWN");
        expect(events[index++].eventtype).toBe("EVENT_SHOWSERIES_START");
        expect(events[index++].eventtype).toBe("EVENT_SHOWCROSS_START");
        expect(events[index++].eventtype).toBe("EVENT_SHOWCROSS_END");
        expect(events[index++].eventtype).toBe("EVENT_SHOWNUMBER_START");
        expect(events[index++].eventtype).toBe("EVENT_SHOWNUMBER_END");
        expect(events[index++].eventtype).toBe("EVENT_SHOWNUMBER_START");
        expect(events[index++].eventtype).toBe("EVENT_SHOWNUMBER_END");
        expect(events[index++].eventtype).toBe("EVENT_SHOWSERIES_END");
        expect(events[index++].eventtype).toBe("EVENT_USERINPUT_START");
        expect(events[index++].eventtype).toBe("EVENT_USERINPUT_END");
        expect(events[index++].eventtype).toBe("EVENT_SHOW_PRACTICE_RESULT_START");
        expect(index).toBe(events.length);

        $(document).trigger(spaceKeyUpEvent);
        events = evHandler.getStoredEvents();
        expect(events[index++].eventtype).toBe("EVENT_TYPE_KEYUP");

        $(document).trigger(spaceKeyDownEvent);
        jasmine.clock().tick(10000);
        events = evHandler.getStoredEvents();
        expect(events[index++].eventtype).toBe("EVENT_TYPE_KEYDOWN");
        expect(events[index++].eventtype).toBe("EVENT_PRACTICE_GAME_END");
        expect(events[index++].eventtype).toBe("EVENT_PRACTICE_GAME_START");
        expect(gameData.donePracticeRounds).toBe(1);


    });


});