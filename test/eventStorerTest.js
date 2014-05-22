

describe("eventStorerTest", function() {

    it("eventStorer is defined and is empty ", function() {
        var myfunc = new eventStorer();
        expect(myfunc.getEvents().length).toBe(0);

    });

    it("eventStorer saves and returns one event", function() {
        var myfunc = new eventStorer();
        myfunc.registerEvent("EVENT_TYPE_KEYDOWN", 2, 3);
        var events = myfunc.getEvents()
        var event = myfunc.getEvents()[0];
        expect(event.type).toBe("EVENT_TYPE_KEYDOWN");
        expect(event.value).toBe(2);
        expect(event.timeStamp).toBe(3);
        expect(events.length).toBe(1);
    });

    it("eventStorer saves and returns two events", function() {
        var myfunc = new eventStorer();
        myfunc.registerEvent("EVENT_TYPE_KEYDOWN", 2, 3);
        myfunc.registerEvent("EVENT_TYPE_KEYUP", 4, 5);
        var events = myfunc.getEvents();
        var event0 = myfunc.getEvents()[0];
        var event1 = myfunc.getEvents()[1];
        expect(event0.type).toBe("EVENT_TYPE_KEYDOWN");
        expect(event1.type).toBe("EVENT_TYPE_KEYUP");
        expect(event1.value).toBe(4);
        expect(event1.timeStamp).toBe(5);
        expect(events.length).toBe(2);
    });

});
