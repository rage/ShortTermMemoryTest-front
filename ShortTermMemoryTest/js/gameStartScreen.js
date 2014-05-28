var teksti = "Testissä satunnainen numerosarja tulee näytölle numero kerrallaan. Kun viimeinen numero on näytetty, ilmestyy näyttöön teksti, joka kertoo missä järjestyksessä numerot tulee palauttaa. Paina näppäimistön numeronappuloita ohjeen mukaisessa järjestyksessä. aikaa tähän on 10 sekuntia.";
teksti += " Harjoittelu koostuu kolmesta numerosarjasta - kunkin numerosarjan jälkeen saat palautetta onnistumisestasi.";

function GameStartScreen(){
	
	function start(){
		createHtml();
	}
	
	function createHtml(){
        document.body.innerHTML = "<div id=\"startScreen\">\
        <p id=\"instructions\">" + teksti + "</p>\
        <ul>\
        <li><a onclick=\"stateMachine.startGame('PRACTICE')\"<a>Harjoittele</a></li>\
        <li><a onclick=\"stateMachine.startGame('GAME')\" >Aloita testi</a></li>\
        </ul>\
        </div>\
        ";
	}
	
	return {
		start:start
	}
}
