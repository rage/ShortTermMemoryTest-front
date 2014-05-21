
var stateMachine = function (){
	console.log("stateMachine");
	var l;
	function start(){
		console.log("Start");
		startLogin();
	}
	
	function startLogin(){
		console.log("startLogin");
		l = new Login();
		l.start();
	}
	
	return {
		start:start, 
		login:function (){
			return l
		}
	}
	
}();
