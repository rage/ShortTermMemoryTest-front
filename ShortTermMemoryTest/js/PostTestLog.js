function PostTestLog() {

    function prepareTestLog(events) {
        for (var i=0;i<events.length;i++) {
            events[i].testcase_id=testcase_id;
        }
    }

    function post(events) {
        prepareTestLog(events);
        var eventsJSON = {"testlog" : events};

        $.ajax({
            type: 'POST',
            url: url+"testlogs",
            data: eventsJSON,
            dataType: 'json',
            success: function(){console.log("PostTestLog success");},
            failure: function(errMsg){console.log(errMsg);}
        });

    }

    return {
        post: post
    }
}

