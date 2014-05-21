
function Login(){
    console.log("login")
    function start(){
        console.log("loginStart");
        
        createHtml();
        
    }
    
    function createHtml(){
        console.log("createHtml")
        document.body.innerHTML = "<form><input type=\"text\"></form>";
    }
    
	return {
		start:start
	}
}
