console.log("login.js");
function Login(){
    function start(){
        
        createHtml();
        
    }
    
    function createHtml(){
        console.log("createHtml")
        document.body.innerHTML = "<div id=\"login\">\
        <form onSubmit=\"stateMachine.login().checkUsername(document.getElementById('username').value)\">\
        <input type=\"text\" id=\"username\" autofocus required>\
        <input type=\"button\" value=\"Aloita\" onclick=\"stateMachine.login().checkUsername(document.getElementById('username').value)\" />\
        </form>";
    }
    
    function checkUsername(user){
        
        var url = "http://shorttermmemorytest.herokuapp.com/login";
        //var url = "http://localhost:3000/login";
        
        var params = "username="+user;
        username = user;
        var request = createPostRequest();
        var responseText = request.create(url, params);
        
        console.log(responseText); 
        if(responseText == "true"){
            console.log("true");
            stateMachine.startGameStartScreen();
            return true
        }else{
            console.log("false");
            stateMachine.startRegister();
            return false
        }
        
    }
    

	return {
		start:start,
        checkUsername:checkUsername
	}
}
