console.log("createUser.js");
function CreateUser(){
    console.log("createUser olio");
    
    function start(){
        console.log("cu s");
        
        createHtml();
        
    }
    
    function createHtml(){
        console.log("cu html");
        
        
        var vuosi = new Date().getFullYear();
        var text = ""; 
         for (var i = 1900; i <= vuosi; i++) {
            text = "<option value=\""+i+"\">"+i+"</option>"+text;
        }
            console.log(text);
        
        document.body.innerHTML = "<div id=\"createUser\"><form onSubmit=\"stateMachine.createUser()\">\
        Sukupuoli:\
        <input type=\"radio\" name=\"sex\" class=\"sex\" value=\"m\" id=\"m\">Mies\
        <input type=\"radio\" name=\"sex\" class=\"sex\" value=\"f\">Nainen\
        <input type=\"radio\" name=\"sex\" class=\"sex\" value=\"o\">Muu<br>\
        Syntymävuosi: \
        <select name=\"yearofbirth\" id=\"yearofbirth\">"
        +text+
        "</select>\
        <br>\
        Kätisyys: \
        <input type=\"radio\" name=\"handedness\" value=\"r\" id=\"r\">Oikea\
        <input type=\"radio\" name=\"handedness\" value=\"l\">Vasen<br>\
        Koulutus: <input type=\"text\" id=\"education\"><br>\
        <input type=\"button\" value=\"Jatka\" onclick=\"stateMachine.createUser()\" />\
        </form></div>";
    }
    
	function signup(){
         
        var url = "http://shorttermmemorytest.herokuapp.com/signup";
        //var url = "http://localhost:3000/login";
        
        console.log("signup asdnasd");
        var yearofbirth = document.getElementById("yearofbirth").options[document.getElementById("yearofbirth").selectedIndex].value;
        var params = "username="+username+
        "&sex="+document.querySelector('input[name="sex"]:checked').value+
        "&yearOfBirth="+yearofbirth+
        "&handedness="+document.querySelector('input[name="handedness"]:checked').value+
        "&education="+document.getElementById("education").value;
        var request = createPostRequest();
        var responseText = request.create(url, params);
        
        
        
        if(responseText == "true"){
            console.log("true");
            stateMachine.startGameStartScreen();
            return true;
        }else{
            console.log("false");
            stateMachine.startRegister();
            return false;
        }
	}
    
		
	return {
		start:start,
        signup:signup
	}
    
    
}
