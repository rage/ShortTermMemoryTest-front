function PostTestLog(user, settings) {

    function prepareTestLog(events) {
        for (var i = 0; i < events.length; i++) {
            events[i].testcase_id=user.testCase();
        }
    }

    function post(events) {
        prepareTestLog(events);
        var eventsJSON = {"testlog" : events};

        $.ajax({
            type: 'POST',
            url: settings.url+"testlogs",
            data: eventsJSON,
            dataType: 'json'
        });

    }

    return {
        post: post
    }
}

