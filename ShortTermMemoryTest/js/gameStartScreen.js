function GameStartScreen(){
    var selected = "startpractise";
    var selectedColor = "green";
    //userIsTrained = true;
	
	function start(){
		createHtml();
	}

    window.onkeypress = function(e) {

        var key = e.keyCode ? e.keyCode : e.which;

        if(key == 13) {
            startSelectedType();
        }else if(key >= 37 && key <= 40 && userIsTrained){
            reverseSelected();
        }

    }

    function startSelectedType(){

        if(selected == "startpractise"){
            stateMachine.startGame('PRACTICE');
        }else{
            stateMachine.startGame('GAME');
        }

        window.onkeypress = "";

    }

    function reverseSelected(){

        if(selected == "startpractise"){

            selected = "starttest"
            document.getElementById("startpractise").style.backgroundColor = "black";
            document.getElementById("starttest").style.backgroundColor = selectedColor;

        }else{

            selected = "startpractise"
            document.getElementById("startpractise").style.backgroundColor = selectedColor;
            document.getElementById("starttest").style.backgroundColor = "black";

        }

    }

	function createHtml(){

        var startTest = "";

        if(userIsTrained){
            startTest = '<li id="starttest">Aloita testi</li>'
        }

        var teksti = "Testissä satunnainen numerosarja tulee näytölle numero kerrallaan. " +
            "Kun viimeinen numero on näytetty, ilmestyy näyttöön teksti, joka kertoo missä järjestyksessä numerot tulee palauttaa. " +
            "Paina näppäimistön numeronappuloita ohjeen mukaisessa järjestyksessä. aikaa tähän on 10 sekuntia " +
            "Harjoittelu koostuu kolmesta numerosarjasta - kunkin numerosarjan jälkeen saat palautetta onnistumisestasi.";

        document.body.innerHTML = '<div id="startScreen">\
        <p id="instructions">' + teksti + '</p>\
        <ul>\
        <li id="startpractise">Harjoittele</li>'
        +startTest+
        '</ul>\
        </div>';
        document.getElementById("startpractise").style.backgroundColor="green";

	}
	
	return {
		start:start
	}
}
