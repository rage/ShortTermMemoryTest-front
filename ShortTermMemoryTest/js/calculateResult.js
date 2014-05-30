/**
 * Created by kristiak on 22.5.2014.
 */
function calculateResult(events, fromTime) {

    //console.log("calculateResult : eventStore size: " + eventStore.getEvents().length);

    var numbersShown = [];
    var numbersGiven = [];
    var numbersShownOrder;
    var numberOfShownSeries = 0;
    var numberOfCorrectGivenSeries = 0;
    var lastSeriesCorrectness = false;

    for (var i = 0; i < events.length; i++) {
        var event = events[i];

        if (event.timeStamp < fromTime)
            continue;

        if (event.type == "EVENT_SHOWSERIES_START") {
            numbersShown = [];
        }

        if (event.type == "EVENT_SHOWSERIES_END") {
            numberOfShownSeries++;
        }

        if (event.type == "EVENT_SHOWNUMBER_START") {
            numbersShown.push(event.value);
        }

        if (event.type == "EVENT_USERINPUT_START") {
            numbersShownOrder = event.value;
            numbersGiven = [];
        }

        if (event.type == "EVENT_TYPE_KEYDOWN") {
            numbersGiven.push(event.value);
        }

        if (event.type == "EVENT_USERINPUT_END") {
            var correctChars = 0;
            if (numbersShown.length == numbersGiven.length) {
                if (numbersShownOrder == "upwards") {
                    for (var j = 0; j < numbersShown.length; j++) {
                        if (numbersShown[j] == String.fromCharCode(numbersGiven[j])) {
                            correctChars++;
                        }
                    }
                } else if (numbersShownOrder == "backwards") {
                    for (var j = 0; j < numbersShown.length; j++) {
                        if (numbersShown[j] == String.fromCharCode(numbersGiven[numbersShown.length - j - 1])) {
                            correctChars++;
                        }
                    }
                }
            }
            if (numbersShown.length == correctChars) {
                numberOfCorrectGivenSeries++;
                lastSeriesCorrectness = true;
            } else {
                lastSeriesCorrectness = false;
              }
        }

        if (event.type == "EVENT_GAME_END") {
            break;
        }
    }

    return {
        numberOfShownSeries :           numberOfShownSeries,
        numberOfCorrectGivenSeries :    numberOfCorrectGivenSeries,
        lastSeriesCorrectness       :   lastSeriesCorrectness
    };
}
