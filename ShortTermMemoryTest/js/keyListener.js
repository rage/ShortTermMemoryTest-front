function KeyListener(){

    var keyPressFunction;

    window.onkeypress = function(e) {

        var key = e.keyCode || e.which;

        if(keyPressFunction) {
            keyPressFunction(key);
        }

    };

    function set(setKeyPressFunction){
        keyPressFunction = setKeyPressFunction;
    }

    return {
        set:set
    };
}