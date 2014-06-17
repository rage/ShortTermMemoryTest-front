

describe("KeyEventHandler", function() {

    var evHandler;
    var keyHandler;
    var keyDownCounter;

    var keyDownEvent;
    var keyUpEvent;

    var SETUP_DONE = false;

    beforeEach(function() {
        if (SETUP_DONE == true) {
            jasmine.clock().install();
            keyDownCounter = 0;
            evHandler.triggerEvent("EVENT_GAME_START", "", 0);
            jasmine.clock().tick(1000);
            $(document).trigger(keyUpEvent);
        }
    });

    it("this sets up the scene for all other tests", function() {
        $(document).off();

        evHandler = new EventHandler();
        keyHandler = new KeyEventHandler(evHandler);
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


    it("KeyEventHandler generates an EVENT_TYPE_KEYDOWN event on key press", function() {
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
    });


    it("KeyEventHandler generates only one EVENT_TYPE_KEYDOWN event on two consecutice key down presses with no key up in between", function() {
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
    });


    it("KeyEventHandler generates a new EVENT_TYPE_KEYDOWN event only after keyup event", function() {
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
        jasmine.clock().tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        expect(keyDownCounter).toBe(2);
    });

    it("KeyEventHandler stops sending EVENT_TYPE_KEYDOWN events after receiving EVENT_GAME_END event", function() {
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
        evHandler.triggerEvent("EVENT_GAME_END", "", 0);
        jasmine.clock().tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        expect(keyDownCounter).toBe(1);
    });

    it("KeyEventHandler stops sending EVENT_TYPE_KEYDOWN events after receiving EVENT_PRACTICE_GAME_END event", function() {
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
        evHandler.triggerEvent("EVENT_PRACTICE_GAME_END", "", 0);
        jasmine.clock().tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        expect(keyDownCounter).toBe(1);
    });

    it("KeyEventHandler restarts sending EVENT_TYPE_KEYDOWN events after receiving EVENT_GAME_START event", function() {
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
        evHandler.triggerEvent("EVENT_GAME_END", "", 0);
        jasmine.clock().tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
        evHandler.triggerEvent("EVENT_GAME_START", "", 0);
        jasmine.clock().tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        expect(keyDownCounter).toBe(2);
    });

    it("KeyEventHandler restarts sending EVENT_TYPE_KEYDOWN events after receiving EVENT_PRACTICE_GAME_START event", function() {
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
        evHandler.triggerEvent("EVENT_PRACTICE_GAME_END", "", 0);
        jasmine.clock().tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        expect(keyDownCounter).toBe(1);
        $(document).trigger(keyUpEvent);
        evHandler.triggerEvent("EVENT_PRACTICE_GAME_START", "", 0);
        jasmine.clock().tick(100);
        $(document).trigger(keyDownEvent);
        jasmine.clock().tick(100);
        expect(keyDownCounter).toBe(2);
    });

});
