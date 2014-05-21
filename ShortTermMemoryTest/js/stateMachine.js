
var stateMachine = function (){
	console.log("stateMachine");
	
	function start(){
		console.log("Start");
		startLogin();
	}
	
	function startLogin(){
		console.log("startLogin");
		var l = new Login();
		l.start();
	}
	
	return {
		start:start
	}
	
}();
