function PostResults() {

    function post(results) {

        var resultsJSON = {"testlog" : results};


        /*var testJSON = {"testlog" : [{"testcase_id":"1", "eventtype":"dgffdsfdg", "value":"4", "timestamp":"122334223"},
                       {"testcase_id":"1", "eventtype":"dgsfdg", "value":"4", "timestamp":"1223343"}]};
        console.log(resultsJSON);
        console.log(testJSON);*/
        $.ajax({
            type: 'POST',
            url: url+"testlogs",
            data: resultsJSON,
            //processData: false,
            dataType: 'json',
            success: function(){console.log("success");},
            failure: function(errMsg){console.log(errMsg);}
        });
    }
    return {
        post: post
    }
}