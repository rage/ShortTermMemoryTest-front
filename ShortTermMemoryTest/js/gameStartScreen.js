function GameStartScreen(){
    var selected;
	
	function start(){
		createHtml();
	}
    
	function createHtml(){
        var startTest = "";
        selected = "test"
        if(userIsTrained){
            startTest = '<li>\
            <a onclick="stateMachine.startGame(\'GAME\')" id="starttest">Aloita testi</a></li>'

        }
        var teksti = "Testissä satunnainen numerosarja tulee näytölle numero kerrallaan. Kun viimeinen numero on näytetty, ilmestyy näyttöön teksti, joka kertoo missä järjestyksessä numerot tulee palauttaa. Paina näppäimistön numeronappuloita ohjeen mukaisessa järjestyksessä. aikaa tähän on 10 sekuntia.";
        teksti += " Harjoittelu koostuu kolmesta numerosarjasta - kunkin numerosarjan jälkeen saat palautetta onnistumisestasi.";

        document.body.innerHTML = "<div id=\"startScreen\">\
        <p id=\"instructions\">" + teksti + "</p>\
        <ul>\
        <li><a onclick=\"stateMachine.startGame('PRACTICE')\" id=\"startpractise\"a>Harjoittele</a></li>"
        +startTest+
        "</ul>\
        </div>\
        ";
	}
	
	return {
		start:start
	}
}
