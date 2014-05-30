/**
 * Created by kristiak on 23.5.2014.
 */

function showResult(result) {
    console.log("About to show result to user");

    function createHtml(){
        document.body.innerHTML = "<div id=\"Result\">\
        <p>Your result was:</p>\
        <ul>\
        <h1></h1>\
        </ul>\
        </div>\
        ";
    }

    createHtml();
    $("h1").html("There were " + result.numberOfShownSets + " sets. You inputted " + result.numberOfCorrectGivenSets + " sets correctly.");
}
