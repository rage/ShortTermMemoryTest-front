function Logs(user, settings){

    function createResultTableData(events) {
        var userInputStart = false;

        var last_series = 0;
        var this_series = 0;
        var resultTableData = [];

        var keypressindexStartFrom = 1;
        var keypressindex = keypressindexStartFrom;

        for (var i = 0; i < events.length; i++) {
            var event = events[i];

            if (event.eventtype === "EVENT_SHOWNUMBER_START") {
                this_series++;
            }

            if (event.eventtype === "EVENT_USERINPUT_START") {
                userInputStart = true;
            }

            if (event.eventtype === "EVENT_USERINPUT_END") {
                userInputStart = false;
                last_series = this_series;
                this_series = 0;
                keypressindex = keypressindexStartFrom;
            }

            if (event.eventtype === "EVENT_TYPE_KEYDOWN") {
                if (userInputStart) {
                    var result = {};
                    result.testcase_id = user.testCase();
                    result.keypressed = String.fromCharCode(event.value);
                    result.keypressindex = keypressindex++;
                    result.last_series = last_series;
                    result.timestamp = event.timestamp;
                    resultTableData.push(result);
                }
            }
        }

        return resultTableData;
    }


    function prepareTestLog(events) {
        for (var i = 0; i < events.length; i++) {
            events[i].testcase_id = user.testCase();
        }
    }

    function post(events){
        var req = new Request();

        var results = createResultTableData(events);
        var resultsJSON = {"result" : results};
        req.createPostAsync(settings.url + "results", resultsJSON);

        var fullTestLog = prepareTestLog(events);
        var eventsJSON = {"testlog" : fullTestLog};
        req.createPostAsync(settings.url + "testlogs", eventsJSON);
    }

    return {
        post:post
    };
}