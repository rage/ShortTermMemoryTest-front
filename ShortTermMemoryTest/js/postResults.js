function PostResults() {

    function post(results) {
        for(var i=0;i<results.length;i++) {
            results[i]["testcase_id"]=testcase_id;
        }
        var resultsJSON = {"testlog" : results};
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