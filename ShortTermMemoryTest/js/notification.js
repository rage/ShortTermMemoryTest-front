function Notification(){

    function start(){
        createHtml();
    }

    function createHtml(){
        document.body.innerHTML = '<div id="Notification">'+text["testinTarkoitus"]+'</div>';
    }

    function keyPress(key){
        if(key === 32) {
            stateMachine.startGameStartScreen();
        }
    }

    return {
        start:start,
        keyPress:keyPress
    }
}