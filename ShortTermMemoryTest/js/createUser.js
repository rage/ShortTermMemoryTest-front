console.log("createUser.js");
function CreateUser(){
    
    function start(){
        
        createHtml();
        
    }
    
    function createHtml(){
        
        var vuosi = new Date().getFullYear();
        var text = "";
        for (var i = 1900; i <= vuosi; i++) {
            text = "<option value=\""+i+"\">"+i+"</option>"+text;
        }
        
        document.body.innerHTML = '<div id="createUser"><div id="varoitus"></div><form onSubmit="stateMachine.createUser()">\
        Sukupuoli:\
        <input type="radio" name="sex" class="sex" value="m" id="m">Mies\
        <input type="radio" name="sex" class="sex" value="f" id="f">Nainen<br>\
        Syntymävuosi: \
        <select name="yearofbirth" id="yearofbirth">\
        <option value="valitse">Valitse</option>'
        +text+
        '</select>\
        <br>\
        Kätisyys: \
        <input type="radio" name="handedness" value="r" id="r">Oikea\
        <input type="radio" name="handedness" value="l" id="l">Vasen<br>\
        Koulutus: \
        <select name="education" id="education">\
        <option value="valitse">Valitse</option>\
        <option value="Peruskoulu">Peruskoulu</option>\
        <option value="Lukio tai ammattikoulu">Lukio tai ammattikoulu</option>\
        <option value="Korkeakoulu">Korkeakoulu</option>\
        </select><br>\
        <input type="button" value="Jatka" onclick="stateMachine.createUser()" />\
        </form></div>';
    }
    
	function signup(){
         

        try {
            var yearofbirth = document.getElementById("yearofbirth").options[document.getElementById("yearofbirth").selectedIndex].value;
            var education = document.getElementById("education").options[document.getElementById("education").selectedIndex].value;
            if(yearofbirth == "valitse"){
                return false;
            }
            if(education == "valitse"){
                return false;
            }

            var params = "username="+username+
            "&sex="+document.querySelector('input[name="sex"]:checked').value+
            "&yearOfBirth="+yearofbirth+
            "&handedness="+document.querySelector('input[name="handedness"]:checked').value+
            "&education="+document.getElementById("education").value;
        }catch(err) {

            return false;
        }
        var request = Request();


        var responseText = request.createPost(url+"signup", params);
        
        
        
        if(responseText == "true"){
            stateMachine.startNotification();
            return true;
        }else{
            stateMachine.startRegister();
            return false;
        }
	}
    
		
	return {
		start:start,
        signup:signup
	}
    
    
}
