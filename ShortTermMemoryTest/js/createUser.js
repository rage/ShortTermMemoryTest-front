console.log("createUser.js");
function CreateUser(){
    console.log("createUser olio");
    
    function start(){
        console.log("cu s");
        
        createHtml();
        
    }
    
    function createHtml(){
        console.log("cu html");
        document.body.innerHTML = "<div id=\"createUser\"><form>\
        Sukupuoli: <input type=\"text\" id=\"sex\"><br>\
        Syntymävuosi: <input type=\"text\" id=\"yearofbirth\"><br>\
        Koulutus: <input type=\"text\" id=\"education\"><br>\
        Kätisyys: <input type=\"text\" id=\"handedness\"><br>\
        <input type=\"button\" value=\"kirjaudu\" onclick=\"stateMachine.createUser()\" />\
        </form></div>";
    }
    
	function signup(){
        var url = "http://shorttermmemorytest.herokuapp.com/signup";
        //var url = "http://localhost:3000/login";
        var req = createCORSRequest("POST", url);
        console.log(req);
        
        req.onload = function() {
            console.log(text);
            };
        console.log(req.response);
        req.onerror = function() {
            console.log('Kysely ei onnistunut');
        }; 
        var params = "username="+username+
        "&sex="+document.getElementById("sex").value+
        "&yearOfBirth="+document.getElementById("yearofbirth").value+
        "&handedness="+document.getElementById("handedness").value+
        "&education="+document.getElementById("education").value;
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
        signup:signup
	}
    
    
}
