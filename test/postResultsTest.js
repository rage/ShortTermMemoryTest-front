/**
 * Created by mhaanran on 4.6.2014.
 */

describe("PostResultsTest", function() {

    beforeEach(function() {
        //testcase_id = 3;
    });

    it("postResults post() function called with results", function() {
        var postResults = new PostResults();
        var testcase_id = 3;
        var results = [{eventtype: "EVENT_GAME_START",
            timestamp: 1401882827646,
            value: "ThisGame" },
            {eventtype: "EVENT_SHOWLIST_START",
                timestamp: 1401882827646,
                value: ""}];
        spyOn(postResults,"post");
        postResults.post(results);
        expect(postResults.post).toHaveBeenCalledWith(results);
    });

    it("fail when postResults post() function called with invalid results", function() {
        var postResults = new PostResults();

        var results = [{eventty: "EVENT_GAME_START",
            timestamp: 1401882827646,
            value: "ThisGame" },
            {eventtype: "EVENT_SHOWLIST_START",
                timestamp: 1401882827646,
                value: ""}];
        spyOn(postResults,"post");
        postResults.post(results);

    });



    //var testJSON = {"testlog" : [{"testcase_id":"1", "eventtype":"dgffdsfdg", "value":"4", "timestamp":"122334223"},
    //                               {"testcase_id":"1", "eventtype":"dgsfdg", "value":"4", "timestamp":"1223343"}]};



});
