/**
 * Created by kristiak on 30.5.2014.
 */

describe("gameLogicTest", function() {


    var evHandler;
    var keyHandler;
    var game;

    var gameData;


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
        gameData.numberList = createMockNumberList();

            jasmine.clock().install();

    });

    it("KKK", function() {

        game.start(gameData);
        jasmine.clock().tick(10);
        var events = evHandler.getStoredEvents();
        expect(events[0].eventtype).toBe("EVENT_PRACTICE_GAME_START");
        expect(events[1].eventtype).toBe("EVENT_SHOWLIST_START");
        expect(events[2].eventtype).toBe("EVENT_SHOWSERIES_START");
        jasmine.clock().tick(100000000000000000);
        events = evHandler.getStoredEvents();
        //console.log(events);


        /*
        runs(function() {
            game.start(gameData);
        }, "an asynchronous method");


        waitsFor(function() {
            events = evHandler.getStoredEvents();
            if (events[2].eventtype == "EVENT_SHOWCROSS_START") {
                return true;
            } else {
                return false;
            }

        }, "waiting for event", 5000);

        runs(function() {
            var events = evHandler.getStoredEvents();
            console.log(events);
            expect(events[3].eventtype).toBe("EVENT_SHOWCROSS_START");
        });






    /*
      runs (function() {
          game.start(gameData);
      });
      waitsFor(function() {
          var events = evHandler.getStoredEvents();
          if (events.length > 0) return true;
          return false;
      }, "The Value should be incremented", 100);

      runs(function() {
          var events = evHandler.getStoredEvents();
          console.log(events);
          expect(events.length).toBeGreaterThan(0);
      });
     */
    });




/*
    it("this sets up the scene for all other tests", function() {
        evHandler = new eventHandler();
        keyHandler = new keyEventHandler(evHandler);
        game = new gameLogic(evHandler);
        keyDownCounter = 0;
        counter_EVENT_PRACTICE_GAME_START = 0;

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


    it("tmp", function() {
        expect(keyDownCounter).toBe(0);
        evHandler.triggerEvent("EVENT_TYPE_KEYDOWN", 50, 0);
        jasmine.Clock.tick(1000);
        expect(keyDownCounter).toBe(1);
    });


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