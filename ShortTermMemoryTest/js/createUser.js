function createUser(){
    
    function start(){
        createHtml();
    }
    
    function createHtml(){
        document.body.innerHTML = "<div id=\"createUser\"><form>\
        Sukupuoli: <input type=\"text\" id=\"sex\"><br>\
        Syntymävuosi: <input type=\"text\" id=\"yearofbirth\"><br>\
        Koulutus: <input type=\"text\" id=\"education\"><br>\
        Kätisyys: <input type=\"text\" id=\"handedness\"><br>\
        <input type=\"button\" value=\"kirjaudu\" onclick=\"stateMachine.createUser().checkUsername()\" />\
        </form></div>";
    }
    
	function createUser(){
		
	}
		
	return {
		start:start,
		createUser:createUser
	}
    
    
}
