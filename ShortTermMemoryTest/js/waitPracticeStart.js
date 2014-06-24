function WaitPractiseStart(state){

    function start(){
        createHtml();
    }

    function keyPress(key){
        if(key === 32) {
            state.change(6);
        }
    }

    function createHtml(){
        var a = new GUI();
        
        a.createNew(
        [{  "type": "div",
            "id": "PracticeStart",
            "text": text["harjoittelunAloitushje"]
        }]);
            
    }

    return {
        start:start,
        keyPress:keyPress
    };

}
