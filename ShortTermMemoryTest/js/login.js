
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
        <input type=\"text\" id=\"username\" autofocus>\
        <input type=\"button\" value=\"Aloita\" onclick=\"stateMachine.login().checkUsername()\" />\
        </form>";
    }
    
    function checkUsername(){
        
        var url = "http://shorttermmemorytest.herokuapp.com/login";
        //var url = "http://localhost:3000/login";
        var req = createCORSRequest("POST", url);
        console.log(req);
        
        req.onload = function() {
            var text = req.responseText;
            var title = getTitle(text);
            console.log(url + ': ' + title + " : " +text);
            };
        console.log(req.response);
        req.onerror = function() {
            console.log('Kysely ei onnistunut');
        }; 
        var params = "username="+document.getElementById("username").value;
        username = document.getElementById("username").value;
        console.log(params);
        
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.setRequestHeader("Content-length", params.length);
        req.send(params);
        
        console.log(req.responseText); 
        if(req.responseText == "true"){
            console.log("true");
            stateMachine.startGameStartScreen();
        }else{
            console.log("false");
            stateMachine.startRegister();
        }
        
    }
    
    function createCORSRequest(method, url) {
        
        var req = new XMLHttpRequest();
        
        if ("withCredentials" in req) {
            req.open(method, url, false);
        } else if (typeof XDomainRequest != "undefined") {
            req = new XDomainRequest();
            req.open(method, url);
        } else {
            req = null;
        } 
        return req;
    }

	return {
		start:start,
        checkUsername:checkUsername
	}
}
