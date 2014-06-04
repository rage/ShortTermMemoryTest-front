function WaitPractiseStart(){

    function start(){
        createHtml();
    }

    window.onkeypress = function(e) {

        var key = e.keyCode ? e.keyCode : e.which;
        console.log(key);
        if(key == 32) {
            stateMachine.startGame('PRACTICE');
        }

    };

    function createHtml(){
        document.body.innerHTML = '<div id="PracticeStart">'+text["harjoittelunAloitushje"]+'</div>';
    }

    return {
        start:start
    }

}