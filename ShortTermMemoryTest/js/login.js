console.log("login.js");
function Login(){
    function start(){
        
        createHtml();
        
    }
    
    function createHtml(){
        console.log("createHtml")
        document.body.innerHTML = "<div id=\"login\">\
        <form onSubmit=\"stateMachine.login().checkUsername(document.getElementById('username').value)\">\
        <input type=\"text\" id=\"username\" autocomplete=\"off\" autofocus required>\
        <input type=\"button\" value=\"Aloita\" onclick=\"stateMachine.login().checkUsername(document.getElementById('username').value)\" />\
        </form>";
    }
    
    function checkUsername(user){


        var req = new CreateRequest();
        params = "username="+user
        username = user;
        var jsonData = req.createPost(url+"login", params);
        var response = JSON.parse(jsonData);
        if (response.isReserved) {
            if (response.isTrained) {
                stateMachine.startGameStartScreen();
                return true;
            } else {
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
