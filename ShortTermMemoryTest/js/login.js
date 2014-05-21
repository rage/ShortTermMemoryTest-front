
function Login(){
    console.log("login")
    function start(){
        console.log("loginStart");
        
        createHtml();
        
    }
    
    function createHtml(){
        console.log("createHtml")
        document.body.innerHTML = "<form><input type=\"text\"><input type=\"button\" value=\"kirjaudu\" onclick=\"stateMachine.login().checkUsername()\" /></form>";
    }
    
    function checkUsername(){
        
        var url = "http://shorttermmemorytest.herokuapp.com/login";
        
        var req = createCORSRequest("POST", url);
        
        req.onload = function() {
            var text = req.responseText;
            var title = getTitle(text);
            console.log(url + ': ' + title + " : " +text);
            };
        
        req.onerror = function() {
            console.log('Kysely ei onnistunut');
        };

        req.send();
        
         
        return true;
    }
    
    function createCORSRequest(method, url) {
        
        var req = new XMLHttpRequest();
        
        if ("withCredentials" in req) {
            req.open(method, url, true);
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
