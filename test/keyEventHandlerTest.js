

describe("keyEventHandler", function() {

    var evHandler;
    var keyHandler;
    var keyDownEvent;
    var keyUpEvent;
    var keyDownCounter;

    beforeEach(function() {
        evHandler = new eventHandler();
        keyHandler = new keyEventHandler(evHandler);
        jasmine.Clock.useMock();
        keyDownEvent = false;
        keyUpEvent = false;
        keyDownCounter = 0;
    });

    it("keyEventHandler generates an EVENT_TYPE_KEYDOWN event", function() {
        evHandler.registerEventHandler("EVENT_TYPE_KEYDOWN", function () {
            keyDownEvent = true;
        });

        evHandler.triggerEvent("EVENT_GAME_START", "", 0);
        //keyHandler.activate();
        jasmine.Clock.tick(100);
        var e = jQuery.Event("keydown");
        e.keyCode = 50; // # Some key code value
        $(document).trigger(e);
        jasmine.Clock.tick(100);
        expect(keyDownEvent).toBe(true);
    });

    it("keyEventHandler generates a new EVENT_TYPE_KEYDOWN event only after keyup event", function() {
/*
        evHandler.registerEventHandler("EVENT_TYPE_KEYDOWN", function () {
            keyDownCounter++;
        });

        evHandler.triggerEvent("EVENT_GAME_START", "", 0);
        jasmine.Clock.tick(100);

        var down = jQuery.Event("keydown");
        down.keyCode = 50; // # Some key code value
        var up = jQuery.Event("keyup");
        up.keyCode = 50; // # Some key code value

        $(document).trigger(down);
        jasmine.Clock.tick(100);
        $(document).trigger(down);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(1);
        /*
        $(document).trigger(up);
        jasmine.Clock.tick(100);
        $(document).trigger(down);
        jasmine.Clock.tick(100);
        expect(keyDownCounter).toBe(2);
*/
    });
    /*

    it("two keydown-events for the same key records only one event", function() {
        $(document).trigger(down1);
        $(document).trigger(down1);
        expect(storer.getEvents().length).toBe(1);
    });

    it("two keydown-events for different keys records two events", function() {
        $(document).trigger(down1);
        $(document).trigger(down2);
        expect(storer.getEvents().length).toBe(2);
    });

    it("down-up for one key records two events", function() {
        $(document).trigger(down1);
        $(document).trigger(up1);
        expect(storer.getEvents().length).toBe(2);
    });

    it("down1-down2-up1-up2 records 4 events", function() {
        $(document).trigger(down1);
        $(document).trigger(down2);
        $(document).trigger(up1);
        $(document).trigger(up2);
        expect(storer.getEvents().length).toBe(4);
    });

    it("down1-down2-up2-down1 records 3 events", function() {
        $(document).trigger(down1);
        $(document).trigger(down2);
        $(document).trigger(up2);
        $(document).trigger(down1);
        expect(storer.getEvents().length).toBe(3);
    });

    it("details of the event recorded correctly", function() {
        $(document).trigger(down1);
        $(document).trigger(up2);
        var time = new Date().getTime();
        var savedEvent1 = storer.getEvents()[0];
        var savedEvent2 = storer.getEvents()[1];
        expect(savedEvent1.type).toBe("EVENT_TYPE_KEYDOWN");
        expect(savedEvent1.value).toBe(1);
        expect(savedEvent2.type).toBe("EVENT_TYPE_KEYUP");
        expect(savedEvent2.value).toBe(2);
        expect(savedEvent1.timeStamp-time).toBeGreaterThan(-10);
        expect(savedEvent1.timeStamp-time).toBeLessThan(10);
    });
*/

});
