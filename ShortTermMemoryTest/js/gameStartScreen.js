function GameStartScreen(user, state){
    var page = 0;

    function start(){

        var gui = new GUI();

        if(user.isTrained()){
            gui.run("GameStartScreen");
        }else{
            gui.run("GameStartScreenPractice");
        }


    }

    function keyPress(key){
        if(key === 32 && page === 3) {
            state.change(5);
        }else if(key === 13 && user.isTrained() && page === 3) {
            state.change(7);
        }else if(key === 32) {
            changePage();
        }
    }

    function changePage(){
        document.getElementById("startScreenP"+page).style.display = "none";
        page = page+1;
        document.getElementById("startScreenP"+page).style.display = "inline";
    }

    return {
        start:start,
        keyPress:keyPress
    };
}
