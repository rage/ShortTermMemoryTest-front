

describe("keyEventHandler", function() {

    var evHandler;
    var keyHandler;
    var keyDownCounter;

    var keyDownEvent;
    var keyUpEvent;

    var SETUP_DONE = false;

    beforeEach(function() {
        if (SETUP_DONE == true) {
            jasmine.Clock.useMock();
            keyDownCounter = 0;
            evHandler.triggerEvent("EVENT_GAME_START", "", 0);
            jasmine.Clock.tick(1000);
            $(document).trigger(keyUpEvent);
        }
    });

    it("this sets up the scene for all other tests", function() {
        evHandler = new eventHandler();
        keyHandler = new keyEventHandler(evHandler);
        keyDownCounter = 0;

        evHandler.registerEventHandler("EVENT_TYPE_KEYDOWN", function () {
            keyDownCounter++;
        });

        keyDownEvent = jQuery.Event("keydown");
        keyDownEvent.keyCode = 50;

        keyUpEvent = jQuery.Event("keyup");
        keyUpEvent.keyCode = 50;

        SETUP_DONE = true;
    });


    it("keyEventHandler generates an EVENT_TYPE_KEYDOWN event on key press", function() {
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
    });


    it("keyEventHandler generates only one EVENT_TYPE_KEYDOWN event on two consecutice key down presses with no key up in between", function() {
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
    });


    it("keyEventHandler generates a new EVENT_TYPE_KEYDOWN event only after keyup event", function() {
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
        jasmine.Clock.tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(2);
    });

    it("keyEventHandler stops sending EVENT_TYPE_KEYDOWN events after receiving EVENT_GAME_END event", function() {
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
        evHandler.triggerEvent("EVENT_GAME_END", "", 0);
        jasmine.Clock.tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(1);
    });

    it("keyEventHandler stops sending EVENT_TYPE_KEYDOWN events after receiving EVENT_PRACTICE_GAME_END event", function() {
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
        evHandler.triggerEvent("EVENT_PRACTICE_GAME_END", "", 0);
        jasmine.Clock.tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(1);
    });

    it("keyEventHandler restarts sending EVENT_TYPE_KEYDOWN events after receiving EVENT_GAME_START event", function() {
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
        evHandler.triggerEvent("EVENT_GAME_END", "", 0);
        jasmine.Clock.tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
        evHandler.triggerEvent("EVENT_GAME_START", "", 0);
        jasmine.Clock.tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(2);
    });

    it("keyEventHandler restarts sending EVENT_TYPE_KEYDOWN events after receiving EVENT_PRACTICE_GAME_START event", function() {
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
        evHandler.triggerEvent("EVENT_PRACTICE_GAME_END", "", 0);
        jasmine.Clock.tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
        evHandler.triggerEvent("EVENT_PRACTICE_GAME_START", "", 0);
        jasmine.Clock.tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(2);
    });

});
