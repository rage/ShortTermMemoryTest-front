/**
 * Created by kristiak on 22.5.2014.
 */
function calculateResult(eventStore) {

    //console.log("calculateResult : eventStore size: " + eventStore.getEvents().length);

    var events = eventStore.getEvents();

    var numbersShown = [];
    var numbersGiven = [];
    var numbersShownOrder;
    var numberOfShownSets = 0;
    var numberOfCorrectGivenSets = 0;

    for (var i = 0; i < events.length; i++) {
        var event = events[i];

        if (event.type == "EVENT_START_SHOWSERIES") {
            numbersShown = [];
        }

        if (event.type == "EVENT_END_SHOWSERIES") {
            numberOfShownSets++;
        }

        if (event.type == "EVENT_START_NUMBER") {
            numbersShown.push(event.value);
            //console.log("calculateResult: EVENT_START_NUMBER: " + event.value);
        }

        if (event.type == "EVENT_START_TYPING") {
            numbersShownOrder = event.value;
            numbersGiven = [];
        }

        if (event.type == "EVENT_TYPE_KEYDOWN") {
            numbersGiven.push(event.value);
            //console.log("calculateResult: EVENT_TYPE_KEYDOWN: " + event.value);
        }

        if (event.type == "EVENT_END_TYPING") {
            var correctChars = 0;
            if (numbersShown.length == numbersGiven.length) {
                if (numbersShownOrder == "NORMAL") {
                    for (var j = 0; j < numbersShown.length; j++) {
                        if (numbersShown[j] == String.fromCharCode(numbersGiven[j])) {
                            correctChars++;
                        }
                    }
                } else if (numbersShownOrder == "REVERSE") {
                    for (var j = 0; j < numbersShown.length; j++) {
                        if (numbersShown[j] == String.fromCharCode(numbersGiven[numbersShown.length - j - 1])) {
                            correctChars++;
                        }
                    }
                }
            }
            if (numbersShown.length == correctChars) {
                numberOfCorrectGivenSets++;
                console.log("calculateResult: The user gave a correct set");
                //break;
            } else {
                console.log("calculateResult: The user gave an incorrect set. correctChars: " + correctChars + " numbersShown: " + numbersShown);
            }
        }

        if (event.type == "EVENT_END_GAME") {
            break;
        }
    }

    return {
        numberOfShownSets : numberOfShownSets,
        numberOfCorrectGivenSets : numberOfCorrectGivenSets
    };
}
