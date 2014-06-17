function EventStorer() {

    var events = [ ];

    function event(eventtype, value, timestamp) {
       // var testcase_id = testcase_id || 1;
        var eventtype   = eventtype;
        var value       = value;
        var timestamp   = timestamp;

        return {
            //testcase_id: testcase_id,
            eventtype:  eventtype,
            value:      value,
            timestamp:  timestamp
        };
    }

    function registerEvent(eventtype, value, timestamp) {
        events.push(new event(eventtype, value, timestamp));
    }

    function getEvents() {
        return events;
    }

    return {
        registerEvent   : registerEvent,
        getEvents       : getEvents
    };
}
