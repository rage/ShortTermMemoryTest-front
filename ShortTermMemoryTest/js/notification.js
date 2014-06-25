function Notification(state){

    function start(){

        var gui = new GUI();

        gui.createNew([
            {
                "type": "div",
                "id": "Notification",
                "text": "testinTarkoitus"
            }
        ]);

    }

    function keyPress(key){
        if(key === 32) {
            state.change(4);
        }
    }

    return {
        start:start,
        keyPress:keyPress
    };
}