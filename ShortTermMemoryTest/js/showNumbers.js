
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
    var texts = {normiSuunta:"Palauta sarja",
                 takaperin:"Palauta sarja käänteisessä järjestyksessä"};
    var listOfNumbers = ["5","7"/*,"3","8","4","7","1"*/];
    var sarjaLen = ["4","3"];
    var order = "upwards";//["upwards","backwards"]"
    var index = 0;

    function startShowing(/*listOfNumbers*/) {
        createHtml();
        showNumber();
        //typeAnswer();
        function showNumber() {
            if(index<=listOfNumbers.length) {
                $("h1").hide();
                evStore.registerEvent("EVENT_START_NUMBER", "GAME_IDENTIFIER_BLAHBLAH", Date.now());
                setTimeout(timeBetweenNumbers,500);
            }
            else {
                $("h1").hide();
                evStore.registerEvent("EVENT_END_TYPING", "GAME_IDENTIFIER_BLAHBLAH", Date.now());
            }
        }
        function timeBetweenNumbers() {
            if(index<listOfNumbers.length) {
                $("h1").show();
                $("h1").html(listOfNumbers[index]);
                index++;
                setTimeout(showNumber,1000);
            }
            else if(index==listOfNumbers.length) {
                $("h1").show();
                $("h1").html(texts.normiSuunta);
                index++;
                evStore.registerEvent("EVENT_START_TYPING", "GAME_IDENTIFIER_BLAHBLAH", Date.now());
                setTimeout(showNumber,10000);
            }
            evStore.registerEvent("EVENT_END_NUMBER", "GAME_IDENTIFIER_BLAHBLAH", Date.now());
        }
        console.log("here");
    }

    return {
        startShowing: startShowing
    }
});