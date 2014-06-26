function Notification(state, gui){

    function start(){
        gui.run("Notification");
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