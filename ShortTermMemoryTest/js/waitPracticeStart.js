function WaitPractiseStart(){

    function start(){
        createHtml();
    }

    function keyPress(key){
        if(key == 32) {
            stateMachine.startGame('PRACTICE');
        }
    }

    function createHtml(){
        document.body.innerHTML = '<div id="PracticeStart">'+text["harjoittelunAloitushje"]+'</div>';
    }

    return {
        start:start,
        keyPress:keyPress
    }

}
