function calculateResult(events, fromTime) {

    //konsoli.log("calculateResult : eventStore size: " + eventStore.getEvents().length);

    var numbersShown = [];
    var numbersGiven = [];
    var numbersShownOrder;
    var numberOfShownSeries = 0;
    var numberOfCorrectGivenSeries = 0;
    var lastSeriesCorrectness = false;
    var lastSeriesFailed = false;


    function countCorrectChars() {
        var n = 0;
        if (numbersShownOrder == "upwards") {
            while (n < numbersGiven.length && n < numbersShown.length && numbersShown[n] == String.fromCharCode(numbersGiven[n])) {
                n++;
            }
        }

        if (numbersShownOrder == "backwards") {
            while (n < numbersGiven.length && n < numbersShown.length && numbersShown[numbersShown.length - n - 1] == String.fromCharCode(numbersGiven[n])) {
                n++;
            }
        }
        return n;
    }

    function updateLastSeriesCorrectness() {
        if (numbersShown.length == correctChars && numbersShown.length == numbersGiven.length) {
            numberOfCorrectGivenSeries++;
            lastSeriesCorrectness = true;
        } else {
            lastSeriesCorrectness = false;
        }
    }

    for (var i = 0; i < events.length; i++) {
        var event = events[i];

        if (event.timestamp < fromTime)
            continue;

        if (event.eventtype == "EVENT_SHOWSERIES_START") {
            numbersShown = [];
        }

        if (event.eventtype == "EVENT_SHOWSERIES_END") {
            numberOfShownSeries++;
        }

        if (event.eventtype == "EVENT_SHOWNUMBER_START") {
            numbersShown.push(event.value);
        }

        if (event.eventtype == "EVENT_USERINPUT_START") {
            numbersShownOrder = event.value;
            numbersGiven = [];
        }

        if (event.eventtype == "EVENT_TYPE_KEYDOWN") {
            numbersGiven.push(event.value);
        }

        if (event.eventtype == "EVENT_USERINPUT_END") {
            var correctChars = countCorrectChars();
            if(correctChars<gameSettings.failLimit){
                lastSeriesFailed = true;
            } else {
                lastSeriesFailed = false;
            }
            updateLastSeriesCorrectness();
        }

        if (event.eventtype == "EVENT_GAME_END") {
            break;
        }
    }

    return {
        numberOfShownSeries :           numberOfShownSeries,
        numberOfCorrectGivenSeries :    numberOfCorrectGivenSeries,
        lastSeriesCorrectness       :   lastSeriesCorrectness,
        lastSeriesFailed:               lastSeriesFailed
    };
}
