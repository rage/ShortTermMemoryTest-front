function GameStartScreen(){
    var selected = "startpractise";
    var selectedbackgroundColor = "white";
    var selectedColor = "black";
    //userIsTrained = true;
	
	function start(){
		createHtml();
	}

    window.onkeypress = function(e) {

        var key = e.keyCode ? e.keyCode : e.which;
        console.log(key)
        if(key == 32) {
            stateMachine.startGame('PRACTICE');
        }else if(key == 13 && userIsTrained) {
            stateMachine.startGame('GAME');
        }
        window.onkeypress = "";

    }


	function createHtml(){


        if(userIsTrained){
            document.body.innerHTML = '<div id="startScreen"><div id="instructions">' + text["ohje"] + '</div></div>';
        }else{
            document.body.innerHTML = '<div id="startScreen"><div id="instructions">' + text["ohjeHarjoitteluSuorittamatta"] + '</div>'+text["ekaHarjoittelu"]+'</div>';
        }

        /*if(userIsTrained){
            document.getElementById("selected").style.color = selectedColor;
            document.getElementById("selected").style.backgroundColor = selectedbackgroundColor;
        }*/
	}
	
	return {
		start:start
	}
}
