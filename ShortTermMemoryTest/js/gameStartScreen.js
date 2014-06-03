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
            document.getElementById("startpractise").style.color = "white";
            document.getElementById("starttest").style.backgroundColor = selectedbackgroundColor;
            document.getElementById("starttest").style.color = selectedColor;

        }else{

            selected = "startpractise"
            document.getElementById("startpractise").style.color = selectedColor;
            document.getElementById("startpractise").style.backgroundColor = selectedbackgroundColor;
            document.getElementById("starttest").style.backgroundColor = "black";
            document.getElementById("starttest").style.color = "white";

        }

    }

	function createHtml(){

        var startTest = "";

        if(userIsTrained){
            startTest = '<ul><li id="startpractise">Harjoittele</li><li id="starttest">Aloita testi</li></ul>';
        }else{
            startTest = '<p id="startpractise" class="startpractise">'+text["ekaHarjoittelu"]+'</p>'
        }


        document.body.innerHTML = '<div id="startScreen">\
        <p id="instructions">' + text["ohje"] + '</p>\
        '+startTest+'\
        </div>';

        if(userIsTrained){
            document.getElementById("startpractise").style.color = selectedColor;
            document.getElementById("startpractise").style.backgroundColor = selectedbackgroundColor;
        }
	}
	
	return {
		start:start
	}
}
