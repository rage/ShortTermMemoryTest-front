function WaitPractiseStart(state){

    function start(){
        var a = new GUI();

        a.createNew(
            [
                {
                    "type": "div",
                    "id": "PracticeStart",
                    "text": "harjoittelunAloitushje"
                }
            ]
        );
    }

    function keyPress(key){
        if(key === 32) {
            state.change(6);
        }
    }

    return {
        start:start,
        keyPress:keyPress
    };

}
