
var stateMachine = function (){
	console.log("stateMachine");
	var login;
	var state;
	var register;
	function start(){
		console.log("Start");
		startLogin();
	}
	
	function startLogin(){
		state = 1;
		console.log("startLogin");
		login = new Login();
		login.start();
	}
	
	function startRegister(){
		state = 2;
		register = new createUser();
		register.start();
	}
	
	function startGameStartScreen(){
		state = 3;
		register = new createUser();
		register.start();
	}
	
	function startGame(){
		state = 4;
		
	}
	
	
	return {
		start:start, 
		login:function (){
			return login
		}
	}
	
}();
