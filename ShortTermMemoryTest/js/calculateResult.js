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
    var lastSeriesFailed = false;

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
            var j=0;
            if (numbersShownOrder == "upwards") {
                while (j < numbersGiven.length && j < numbersShown.length && numbersShown[j] == String.fromCharCode(numbersGiven[j])) {
                    correctChars++;
                    j++;
                }
            }
            if (numbersShownOrder == "backwards") {
                while (j < numbersGiven.length && j < numbersShown.length && numbersShown[numbersShown.length - j - 1] == String.fromCharCode(numbersGiven[j])) {
                    correctChars++;
                    j++;
                }
            }
//            if (numbersShown.length == numbersGiven.length) {


//                if (numbersShownOrder == "upwards") {
//                    for (var j = 0; j < numbersShown.length; j++) {
//                        if (numbersShown[j] == String.fromCharCode(numbersGiven[j])) {
//                            correctChars++;
//                        }
//                    }
//                } else if (numbersShownOrder == "backwards") {
//                    for (var j = 0; j < numbersShown.length; j++) {
//                        if (numbersShown[j] == String.fromCharCode(numbersGiven[numbersShown.length - j - 1])) {
//                            correctChars++;
//                        }
//                    }
//                }
//            }
            if(correctChars<failLimit){
                lastSeriesFailed = true;
            }
            if (numbersShown.length == correctChars && numbersShown.length == numbersGiven.length) {
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
        lastSeriesCorrectness       :   lastSeriesCorrectness,
        lastSeriesFailed:               lastSeriesFailed
    };
}
