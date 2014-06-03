console.log("login.js");
function Login(){
    function start(){
        
        createHtml();
        
    }
    
    function createHtml(){
        document.body.innerHTML = "<div id=\"login\">\
        <form onSubmit=\"stateMachine.login().checkUsername(document.getElementById('username').value)\">\
        <input type=\"text\" id=\"username\" autocomplete=\"off\" autofocus required>\
        <input type=\"button\" value=\"Aloita\" onclick=\"stateMachine.login().checkUsername(document.getElementById('username').value)\" />\
        </form>";
    }
    
    function checkUsername(user){


        var req = new Request();
        params = "username="+user
        username = user;
        var jsonData = req.createPost(url+"login", params);
        var response = JSON.parse(jsonData);
        if (response.isReserved) {
            if (response.isTrained) {
                userIsTrained = true;
                stateMachine.startGameStartScreen(); 
                return true;
            } else {
                userIsTrained = false;
                stateMachine.startGameStartScreen(); 
                return true;
            }
        } else {
                stateMachine.startRegister();
                return false;
        }

        
    }
    

	return {
		start:start,
        checkUsername:checkUsername
	}
}
