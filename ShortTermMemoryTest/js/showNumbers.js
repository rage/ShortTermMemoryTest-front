
var ShowNumbers = (function(evStore) {

    function createHtml(){
        document.body.innerHTML = "<div id=\"Game\">\
        <ul>\
        <h1></h1>\
        </ul>\
        </div>\
        ";
    }

    console.log("Starting to show numbers");
    var texts = {"normiSuunta":"Palauta sarja",
                 "takaperin":"Palauta sarja käänteisessä järjestyksessä"};
    var listOfNumbers = ["5","7","3","8","4","7","1"];
    var sarjaLen = ["4","3"];
    var index = 0;

    function startShowing(listOfNumbers) {
        createHtml();
        showNumber();
        function showNumber() {
            //console.log("hiiii "+index)
            $("h1").hide();
            evStore.registerEvent("EVENT_START_NUMBER", "GAME_IDENTIFIER_BLAHBLAH", Date.now());
            setTimeout(timeBetweenNumbers,500);
        }
        function timeBetweenNumbers() {
            if(index<listOfNumbers.length) {
                $("h1").show();
                $("h1").html(listOfNumbers[index]);
                index++;
                evStore.registerEvent("EVENT_END_NUMBER", "GAME_IDENTIFIER_BLAHBLAH", Date.now());
                setTimeout(showNumber,1000);
                //console.log("h0000 "+index)
            }
        }
    }
    function typeAnswer() {

    }

    return {
        startShowing: startShowing
    }
});