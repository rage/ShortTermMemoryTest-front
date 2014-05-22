/**
 * Created by kristiak on 22.5.2014.
 */

function eventStorer() {

    console.log("eventStorer constructor");
    var events = [ ];

    function event(type, value, timeStamp) {
        var type        = type;
        var value       = value;
        var timeStamp   = timeStamp;

        return {
            type:       type,
            value:      value,
            timeStamp:  timeStamp
        };
    }

    function registerEvent(type, value, timeStamp) {
        events.push(new event(type, value, timeStamp));
    }

    function getEvents() {
        return events;
    }

    return {
        registerEvent   : registerEvent,
        getEvents       : getEvents
    };
};
