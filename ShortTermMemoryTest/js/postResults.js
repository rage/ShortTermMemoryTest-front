function PostResults() {

    function post(results) {

        var resultsJSON
        for(var i=0;i<results.length;i++) {
            results[i]["testcase_id"]=testcase_id;
        }
        resultsJSON = {"testlog" : results};
        $.ajax({
            type: 'POST',
            url: url+"testlogs",
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