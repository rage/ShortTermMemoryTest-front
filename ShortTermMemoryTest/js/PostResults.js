function PostResults() {

    var i;

    function post(results) {

        for (i=0;i<results.length;i++) {
            results[i].testcase_id=testcase_id;
        }

        var resultsJSON = {"testlog" : results};

        $.ajax({
            type: 'POST',
            url: url+"testlogs",
            data: resultsJSON,
            dataType: 'json',
            success: function(){
                konsoli.log("success");
            },
            failure: function(errMsg){
                konsoli.log(errMsg);
            }
        });
    }

    return {
        post: post
    }

}