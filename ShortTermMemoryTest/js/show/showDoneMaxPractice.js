/**
 * Created by kristiak on 30.5.2014.
 */
/**
 * Created by kristiak on 23.5.2014.
 */

function showDoneMaxPractice(gameData) {

    var gameData = gameData;

    function createHTML() {
        var htmlStructure = "<div id=\"Result\">\
                                <h1 id=\"firstline\"></h1>\
                                <h1 id=\"secondline\"></h1>\
                                <h1 id=\"thirdline\"></h1>\
                                <h1 id=\"fourthline\"></h1>\
                                <h1 id=\"fifthline\"></h1>\
                                <h1 id=\"sixthline\"></h1>\
                             </div>";
        $("body").html(htmlStructure);
    }

    createHTML();

    $("#firstline").html("PRACTICE");
    $("#secondline").html("You have already practiced for the test.");
    $("#thirdline").html("You cannot practice again.");
    $("#fourthline").html("Press enter to continue.");

    gameData.requestFocus(function (event, keyCode) {
        if (keyCode == 13) {
            hideDoneMaxPractice();
            stateMachine.startGameStartScreen();
        }
    });


    function hideDoneMaxPractice() {
        $("#Result").html("");
    }
}