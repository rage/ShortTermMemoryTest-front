function Notification(){
    function start(){
        createHtml();
    }

    window.onkeypress = function(e) {

        var key = e.keyCode ? e.keyCode : e.which;

        if(key == 32) {
            stateMachine.startGameStartScreen();
        }

    }

    function createHtml(){
        document.body.innerHTML = '<div id="Notification">'+text["testinTarkoitus"]+'</div>';
    }

    return {
        start:start
    }
}