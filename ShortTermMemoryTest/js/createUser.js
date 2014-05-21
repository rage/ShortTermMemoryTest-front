function createUser(){
    
    function start(){
        createHtml();
    }
    
    function createHtml(){
        document.body.innerHTML = "<form>\
        Sukupuoli: <input type=\"text\"><br>\
        Syntymävuosi: <input type=\"text\"><br>\
        Koulutus: <input type=\"text\"><br>\
        <input type=\"button\" value=\"kirjaudu\" onclick=\"stateMachine.createUser().checkUsername()\" />\
        </form>";
    }
    
	
	return {
		start:start, 
		login:function (){
			return l
		}
	}
    
    
}
