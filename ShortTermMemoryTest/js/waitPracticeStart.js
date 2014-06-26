function WaitPractiseStart(state){

    function start(){
        var gui = new GUI();
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
