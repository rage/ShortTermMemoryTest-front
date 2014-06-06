function GameStartScreen(){
    var selected = "startpractise";
	
	function start(){
		createHtml();
	}

    window.onkeypress = function(e) {

        var key = e.keyCode ? e.keyCode : e.which;

        if(key == 32) {
            stateMachine.startWaitPractice();
        }else if(key == 13 && userIsTrained) {
            stateMachine.startGame('GAME');
        }

    }


	function createHtml(){

        if(userIsTrained){
            document.body.innerHTML = '<div id="startscreen">' + text["ohje"] + '</div>';
        }else{
            document.body.innerHTML = '<div id="startscreen">' + text["ohjeHarjoitteluSuorittamatta"] + '</div>';
        }

	}
	
	return {
		start:start
	}
}
