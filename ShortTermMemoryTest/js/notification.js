function Notification(state){

    function start(){
        createHtml();
    }

    function createHtml(){
        document.body.innerHTML = '<div id="Notification">'+text["testinTarkoitus"]+'</div>';
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