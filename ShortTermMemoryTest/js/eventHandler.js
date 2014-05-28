/**
 * Created by kristiak on 26.5.2014.
 */



function eventHandler() {

    var evStore = new eventStorer();

    function registerEventHandler(eventType, handlerFunction) {
        $(document).on(eventType, handlerFunction);
    }

    function triggerEvent(eventType, eventValue, delay) {
        setTimeout(function () {
                evStore.registerEvent(eventType, eventValue, Date.now());
                $.event.trigger({ type: eventType, message: eventValue, time: Date.now()})
            }
            , delay);
    }

    function getStoredEvents() {
        return evStore.getEvents();
    }

    return {
        triggerEvent            : triggerEvent,
        registerEventHandler    : registerEventHandler,
        getStoredEvents         : getStoredEvents
    };
}
