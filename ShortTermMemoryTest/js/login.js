
function Login(){
    console.log("login")
    function start(){
        console.log("loginStart");
        
        createHtml();
        
    }
    
    function createHtml(){
        console.log("createHtml")
        document.body.innerHTML = "<div id=\"login\">\
        <form onSubmit=\"stateMachine.login().checkUsername()\">\
        <input type=\"text\" id=\"username\" autofocus required>\
        <input type=\"button\" value=\"Aloita\" onclick=\"stateMachine.login().checkUsername(document.getElementById('username').value)\" />\
        </form>";
    }
    
    function checkUsername(username){
        
        var url = "http://shorttermmemorytest.herokuapp.com/login";
        //var url = "http://localhost:3000/login";
        
        var params = "username="+username;
        
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
