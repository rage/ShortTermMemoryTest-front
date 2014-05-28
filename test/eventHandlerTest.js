

describe("eventHandlerTest", function() {

    var handler;
    var beenHere;
    var beenHereToo;

    beforeEach(function() {
        handler = new eventHandler();
        jasmine.Clock.useMock();
        beenHere = false;
        beenHereToo = false;
    });


    it("eventHandler is defined and is empty ", function() {
        expect(handler.getStoredEvents().length).toBe(0);
    });


    it("eventHandler registers event handler and triggers an event", function() {

        handler.registerEventHandler("TEST_EVENT", function() {
            beenHere = true;
        });

        handler.triggerEvent("TEST_EVENT", 10, 0);
        jasmine.Clock.tick(10);
        expect(beenHere).toBe(true);
        expect(handler.getStoredEvents().length).toBe(1);
    });


    it("eventHandler registers two event handlers and triggers an event on both", function() {
        handler.registerEventHandler("TEST_EVENT", function() {
            beenHere = true;
        });
        handler.registerEventHandler("TEST_EVENT", function() {
            beenHereToo = true;
        });
        handler.triggerEvent("TEST_EVENT", 10, 0);
        jasmine.Clock.tick(10);
        expect(beenHere).toBe(true);
        expect(beenHereToo).toBe(true);
        expect(handler.getStoredEvents().length).toBe(1);
    });

    it("eventHandler registers two event handlers and triggers a different event on each", function() {
        handler.registerEventHandler("TEST_EVENT", function() {
            beenHere = true;
        });
        handler.registerEventHandler("TEST_EVENT2", function() {
            beenHereToo = true;
        });
        handler.triggerEvent("TEST_EVENT", 10, 0);
        handler.triggerEvent("TEST_EVENT2", 10, 0);
        jasmine.Clock.tick(10);
        expect(beenHere).toBe(true);
        expect(beenHereToo).toBe(true);
        expect(handler.getStoredEvents().length).toBe(2);
    });



});
