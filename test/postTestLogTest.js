/**
 * Created by mhaanran on 4.6.2014.
 */

describe("PostTestlogTest", function() {

    beforeEach(function() {
        //testcase_id = 3;
    });

    it("postTestLog post() function called with results", function() {
        var postTestlog = new PostTestLog();
        var testcase_id = 3;
        var results = [{eventtype: "EVENT_GAME_START",
            timestamp: 1401882827646,
            value: "ThisGame" },
            {eventtype: "EVENT_SHOWLIST_START",
                timestamp: 1401882827646,
                value: ""}];
        spyOn(postTestlog,"post");
        postTestlog.post(results);
        expect(postTestlog.post).toHaveBeenCalledWith(results);
    });

    it("fail when postTestLog post() function called with invalid results", function() {
        var postTestlog = new PostTestLog();

        var results = [{eventty: "EVENT_GAME_START",
            timestamp: 1401882827646,
            value: "ThisGame" },
            {eventtype: "EVENT_SHOWLIST_START",
                timestamp: 1401882827646,
                value: ""}];
        spyOn(postTestlog,"post");
        postTestlog.post(results);

    });



    //var testJSON = {"testlog" : [{"testcase_id":"1", "eventtype":"dgffdsfdg", "value":"4", "timestamp":"122334223"},
    //                               {"testcase_id":"1", "eventtype":"dgsfdg", "value":"4", "timestamp":"1223343"}]};



});
