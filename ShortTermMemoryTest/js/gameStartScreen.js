var teksti = "Testissä satunnainen numerosarja tulee näytölle numero kerrallaan. Kun viimeinen numero on näytetty, ilmestyy näyttöön teksti, joka kertoo missä järjestyksessä numerot tulee palauttaa. Paina näppäimistön numeronappuloita ohjeen mukaisessa järjestyksessä. aikaa tähän on 10 sekuntia"

function GameStartScreen(){
	
	function start(){
		createHtml();
	}
	
	function createHtml(){
        document.body.innerHTML = "<div id=\"startScreen\">\
        <p id=\"instructions\">" + teksti + "</p>\
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
