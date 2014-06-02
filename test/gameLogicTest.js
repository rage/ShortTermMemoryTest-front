/**
 * Created by kristiak on 30.5.2014.
 */

describe("gameLogicTest", function() {

    var SETUP_DONE = false;

    var evHandler;
    var keyHandler;
    var game;

    var gameData;
    var counter_EVENT_PRACTICE_GAME_START = 0;
    var counter_EVENT_GAME_START = 0;

    beforeEach(function() {
        if (SETUP_DONE == true) {
            counter_EVENT_PRACTICE_GAME_START = 0;
            counter_EVENT_GAME_START = 0;

            gameData = {
                gameIdentifier: "ThisGame",
                numberDisplayTime: 500,
                ISITime: 1500,
                guessTime: 5000,
                showResultTime: 5000,
                numberList: undefined,
                numberListIndex: 0,
                result: undefined,
                mode: "GAME",
                maxPracticeRounds: 3,
                donePracticeRounds: 0
            };
            gameData.numberList = createMockNumberList();
            jasmine.Clock.useMock();
        }
    });


    it("this sets up the scene for all other tests", function() {
        evHandler = new eventHandler();
        keyHandler = new keyEventHandler(evHandler);
        game = new gameLogic(evHandler);
        keyDownCounter = 0;

        evHandler.registerEventHandler("EVENT_TYPE_KEYDOWN", function () {
            keyDownCounter++;
        });

        evHandler.registerEventHandler("EVENT_PRACTICE_GAME_START", function () {
            counter_EVENT_PRACTICE_GAME_START++;
        });

        evHandler.registerEventHandler("EVENT_GAME_START", function () {
            counter_EVENT_GAME_START++;
        });

        keyDownEvent = jQuery.Event("keydown");
        keyDownEvent.keyCode = 50;

        keyUpEvent = jQuery.Event("keyup");
        keyUpEvent.keyCode = 50;

        SETUP_DONE = true;
    });


/*
    it("EVENT_PRACTICE_GAME_START is generated when practice game starts ", function() {
        expect(counter_EVENT_PRACTICE_GAME_START).toBe(0);
        gameData.mode = "PRACTICE";
        game.start(gameData);
        jasmine.Clock.tick(1000);
        expect(counter_EVENT_PRACTICE_GAME_START).toBe(1);
    });
*/






    function createMockNumberList() {
        var numberList = [ ];
        for(var i = 0; i < 3; i++) {
            var numberSeries = {};
            numberSeries.numbers = [ ];
            for (var x = 0; x < 3; x++) {
                numberSeries.numbers[x] = x + i + 2;
            }
            if (i == 1) {
                numberSeries.order = "backwards";
            } else {
                numberSeries.order = "upwards";
            }
            //numberSeries.numbers = numbers;
            numberList[i] = numberSeries;
        }
        return numberList;
    }
});