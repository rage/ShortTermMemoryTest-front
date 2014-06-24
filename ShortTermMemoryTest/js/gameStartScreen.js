function GameStartScreen(user, state){
    var page = 1;

    function start(){
        createHtml();
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


    function createHtml(){

        function createPages(type) {
            document.body.innerHTML = '<div id="startScreen">' +
                '<div id="startScreenP1">' + text[type+"1"] + '</div>' +
                '<div id="startScreenP2">' + text[type+"2"] + '</div>' +
                '<div id="startScreenP3">' + text[type+"3"] + '</div></div>';
        }

        if(user.isTrained()){
            createPages("ohje");
        }else{
            createPages("ohjeHarjoitteluSuorittamatta");
        }

    }

    return {
        start:start,
        keyPress:keyPress
    };
}
