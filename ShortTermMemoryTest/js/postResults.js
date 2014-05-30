function PostResults() {

    function post(results) {
        var resultsJSON = JSON.stringify(results);
        resultsJSON +=
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/testlogs',
            date: resultsJSON,
            success: function() {console.log("success"); }
        });
    }
    return {
        post: post
    }
}