function GameStartScreen(user, state){
    var page = 1;

    function start(){

        var type = "";

        if(user.isTrained()){
            type = "ohje";
        }else{
            type = "ohjeHarjoitteluSuorittamatta";
        }

        var gui = new GUI();

        gui.createNew([
            {
                "type": "div",
                "id": "startScreen",
                "elements":[
                    {
                        "type": "div",
                        "id": "startScreenP1",
                        "text": type+"1"
                    },
                    {
                        "type": "div",
                        "id": "startScreenP2",
                        "text": type+"2"
                    },
                    {
                        "type": "div",
                        "id": "startScreenP3",
                        "text": type+"3"
                    }
                    ]
            }
        ]);
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
