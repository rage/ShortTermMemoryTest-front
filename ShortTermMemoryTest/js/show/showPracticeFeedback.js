/**
 * Created by kristiak on 23.5.2014.
 */

function showPracticeFeedback(gameData) {

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

    if (gameData.result.lastSeriesCorrectness == true) {
        $("#firstline").html(text["oikein"]);
        $("#secondline").html(text["oikeinIlmoitus"]);
        $("#thirdline").html(text["seuraava"]);
    } else {
        $("#firstline").html(text["vaarin"]);
        $("#secondline").html(text["vaarinIlmoitus"]);
        $("#thirdline").html(text["seuraava"]);
    }

    if (gameData.numberList.length == gameData.numberListIndex) {
        $("#thirdline").html(text["harjoitusValmis"]);

        gameData.requestFocus(function (event, keyCode) {
            if (keyCode == 32) {
                hidePracticeFeedback(event);
                gameData.eventHandler.triggerEvent("EVENT_SHOWRESULT_START", "", 0);
            }
        });
    } else {

        gameData.requestFocus(function (event, keyCode) {
            if (keyCode == 32) {
                hidePracticeFeedback(event);
                gameData.eventHandler.triggerEvent("EVENT_SHOWSERIES_START", "", 0);
            }
        });
    }

    function hidePracticeFeedback(event) {
        $("#Result").html("");
    }
}

