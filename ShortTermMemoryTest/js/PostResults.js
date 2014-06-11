function PostResults() {

    function createResultTableData(events) {
        var userInputStart = false;
        var keypressindex = 1;
        var last_series = 0;
        var this_series = 0;
        var resultTableData = [];

        for (var i = 0; i < events.length; i++) {
            var event = events[i];

            if (event.eventtype == "EVENT_SHOWNUMBER_START") {
                this_series++;
            }

            if (event.eventtype == "EVENT_USERINPUT_START") {
                userInputStart = true;
            }

            if (event.eventtype == "EVENT_USERINPUT_END") {
                userInputStart = false;
                last_series = this_series;
                this_series = 0;
                keypressindex = 1;
            }

            if (event.eventtype == "EVENT_TYPE_KEYDOWN") {
                if (userInputStart == true) {
                    var result = {};
                    result.testcase_id = testcase_id;
                    result.keypressed = String.fromCharCode(event.value);
                    //result.keypressed = event.value;
                    result.keypressindex = keypressindex++;
                    result.last_series = last_series;
                    result.timestamp = event.timestamp;
                    resultTableData.push(result);
                }
            }
        }
        return resultTableData;
    }

    function post(events) {
        var resultData = createResultTableData(events);
        var resultsJSON = {"result" : resultData};
        $.ajax({
            type: 'POST',
            url: url+"testlogs",
            url: url+"results",
            data: resultsJSON,
            dataType: 'json',
            success: function(){console.log("success");},
            failure: function(errMsg){console.log(errMsg);}
        });
    }

    return {
        post: post
    }
}
