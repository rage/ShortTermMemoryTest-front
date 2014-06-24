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
        document.body.innerHTML = '<div id="PracticeStart">'+text["harjoittelunAloitushje"]+'</div>';
    }

    return {
        start:start,
        keyPress:keyPress
    };

}
