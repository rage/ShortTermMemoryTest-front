/**
 * Created by kristiak on 22.5.2014.
 */
//(:testcase_id, :eventtype, :value, :timestamp)
function eventStorer() {

    var events = [ ];

    function event(testcase_id,eventtype, value, timestamp) {
        var testcase_id = testcase_id || 1;
        var eventtype   = eventtype;
        var value       = value;
        var timestamp   = timestamp;

        return {
            testcase_id: testcase_id,
            eventtype:  eventtype,
            value:      value,
            timestamp:  timestamp
        };
    }

    function registerEvent(testcase_id, eventtype, value, timestamp) {
        events.push(new event(testcase_id, eventtype, value, timestamp));
    }

    function getEvents() {
        return events;
    }

    return {
        registerEvent   : registerEvent,
        getEvents       : getEvents
    };
};
