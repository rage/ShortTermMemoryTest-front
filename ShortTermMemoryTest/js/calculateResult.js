function calculateResult(events, fromTime) {

    //console.log("calculateResult : eventStore size: " + eventStore.getEvents().length);

    var numbersShown = [];
    var numbersGiven = [];
    var numbersShownOrder;
    var numberOfShownSeries = 0;
    var numberOfCorrectGivenSeries = 0;
    var lastSeriesCorrectness = false;

    function calculateNumbersResults() {

        function calculateUpwards() {
            for (var j = 0; j < numbersShown.length; j++) {
                if (numbersShown[j] == String.fromCharCode(numbersGiven[j])) {
                    correctChars++;
                }
            }
            return j;
        }

        function calculateBackwards() {
            for (var j = 0; j < numbersShown.length; j++) {
                if (numbersShown[j] == String.fromCharCode(numbersGiven[numbersShown.length - j - 1])) {
                    correctChars++;
                }
            }
            return j;
        }

        if (numbersShownOrder == "upwards") {
            var j = calculateUpwards();
        } else if (numbersShownOrder == "backwards") {
            var j = calculateBackwards();
        }

        return {j: j, j: j};

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
            var correctChars = 0;
            if (numbersShown.length == numbersGiven.length) {
                var __ret = calculateNumbersResults();
                var j = __ret.j;
                var j = __ret.j;
            }
            if (numbersShown.length == correctChars) {
                numberOfCorrectGivenSeries++;
                lastSeriesCorrectness = true;
            } else {
                lastSeriesCorrectness = false;
            }
        }

        if (event.eventtype == "EVENT_GAME_END") {
            break;
        }
    }

    return {
        numberOfShownSeries :           numberOfShownSeries,
        numberOfCorrectGivenSeries :    numberOfCorrectGivenSeries,
        lastSeriesCorrectness       :   lastSeriesCorrectness
    };
}
