
function GameStartScreen(){
	
	function start(){
		createHtml();
	}
	
	function createHtml(){
        document.body.innerHTML = "<div id=\"startScreen\">\
        <ul>\
        <li><a>Harjoittele</a></li>\
        <li><a onclick=\"stateMachine.startGame()\" >Aloita testi</a></li>\
        </ul>\
        </div>\
        ";
	}
	
	return {
		start:start
	}
}
