

function KeyEventHandler(eventHandler) {

    eventHandler.registerEventHandler("EVENT_GAME_START", activate);
    eventHandler.registerEventHandler("EVENT_GAME_END", deactivate);
    eventHandler.registerEventHandler("EVENT_PRACTICE_GAME_START", activate);
    eventHandler.registerEventHandler("EVENT_PRACTICE_GAME_END", deactivate);

    var active = false;
    var keyDownHandler;

    var keyStatus = (function () {
        var keyDown = [256];
        for (var i = 0; i < 256; i++) {
            keyDown[i] = false;
        }

        function isKeyDown(keyCode) {
            return keyDown[keyCode];
        }

        function setKeyDown(keyCode) {
            keyDown[keyCode] = true;
        }

        function setKeyUp(keyCode) {
            keyDown[keyCode] = false;
        }

        return {
            isKeyDown:  isKeyDown,
            setKeyDown: setKeyDown,
            setKeyUp:   setKeyUp
        };
    })();


    $(document).keydown(function(eventInformation) {
        if (active == true) {
            if (keyStatus.isKeyDown(eventInformation.keyCode) == false) {
                keyStatus.setKeyDown(eventInformation.keyCode);
                eventHandler.triggerEvent("EVENT_TYPE_KEYDOWN", eventInformation.keyCode, 0);
            }
        }
    });

    $(document).keyup(function(eventInformation) {
        if (active == true) {
            keyStatus.setKeyUp(eventInformation.keyCode);
            eventHandler.triggerEvent("EVENT_TYPE_KEYUP", eventInformation.keyCode, 0);
        }
    });


    function activate () {
        active = true;
    }

    function deactivate () {
        active = false;
    }



    return {
        activate   : activate,
        deactivate : deactivate
    };
}
