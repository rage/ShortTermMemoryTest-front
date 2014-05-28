/**
 * Created by kristiak on 23.5.2014.
 */

function showInstructions(gameData) {

    var gameData = gameData;

    function createHTML() {
        var htmlStructure = "<div id=\"Instructions2\">\
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
    if (gameData.mode == "PRACTICE") {
        $("#firstline").html("PRACTICE SERIES - INSTRUCTIONS");
        $("#secondline").html("You are going to be shown a series of numbers one by one.");
        $("#thirdline").html("After the series has been shown to you, you will be asked to enter the numbers in either the same order that they were shown to you, or the reverse order. The time to enter the numbers is limited. You must not enter numbers before prompted to do so.");
        $("#fourthline").html("There will be three series in all. You will be given feedback after each series.");
        $("#fifthline").html("Press enter to begin.");
        $("#sixthline").html("(Please note that the first series will start immediately)");
    } else if (gameData.mode == "GAME") {
        $("#firstline").html("SHORT TERM MEMORY TEST");
        $("#secondline").html("You are going to be shown a series of numbers one by one.");
        $("#thirdline").html("After a series has been shown to you, you will be asked to enter the shown numbers in either the same order that they were shown to you, or the reverse order. The time to enter the numbers is limited. You must not enter numbers before prompted to do so.");
        $("#fifthline").html("Press enter to begin.");
        $("#sixthline").html("(Please note that the first series will start immediately and there are no pauses between series)");
    }

    gameData.requestFocus(keyDownHandler);


    function keyDownHandler(event, keyCode) {
        if (keyCode == 13) {
            hideInstructions();
            gameData.eventHandler.triggerEvent("EVENT_SHOWLIST_START", "", 0);
        }
    }

    function hideInstructions() {
        $("#Instructions2").html("");
    }
}
