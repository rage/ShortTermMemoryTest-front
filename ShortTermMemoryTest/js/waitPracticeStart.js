function WaitPractiseStart(state, gui){

    function start(){
        gui.run("PracticeStart");
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
