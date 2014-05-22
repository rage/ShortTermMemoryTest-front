/**
 * Created by kristiak on 22.5.2014.
 */
/**
 * Created by kristiak on 22.5.2014.
 */

function keyEventHandler(eventStorer) {
    console.log("keyEventHandler: constructor");
    var eventStorer = eventStorer;


    var keyStatus = (function () {
        var keyDown = [256];
        for (var i = 0; i < 256; i++) {
            keyDown[i] = false;
        }

        function isKeyDown(keyCode) {
            return keyDown[keyCode];
        }

        function setKeyDown(keyCode) {
            return keyDown[keyCode] = true;
        }

        function setKeyUp(keyCode) {
            return keyDown[keyCode] = false;
        }

        return {
            isKeyDown:  isKeyDown,
            setKeyDown: setKeyDown,
            setKeyUp:   setKeyUp
        };
    })();



    $(document).keydown(function(eventInformation) {
        processEventKeyDown(eventInformation);
    });

    $(document).keyup(function(eventInformation) {
        processEventKeyUp(eventInformation);
    });





    function processEventKeyDown(eventInformation) {
        if (keyStatus.isKeyDown(eventInformation.keyCode) == false) {
            keyStatus.setKeyDown(eventInformation.keyCode);
            eventStorer.registerEvent("EVENT_TYPE_KEYDOWN", eventInformation.keyCode, eventInformation.timeStamp);
            console.log("keyEventHandler: EVENT_TYPE_KEYDOWN : keyCode: " + eventInformation.keyCode + " timeStamp: " + eventInformation.timeStamp);
        }
    }






    function processEventKeyUp(eventInformation) {
        keyStatus.setKeyUp(eventInformation.keyCode);
        eventStorer.registerEvent("EVENT_TYPE_KEYUP", eventInformation.keyCode, eventInformation.timeStamp);
        console.log("keyEventHandler: EVENT_TYPE_KEYUP : keyCode: " + eventInformation.keyCode + " timeStamp: "  + eventInformation.timeStamp);
    }
};
