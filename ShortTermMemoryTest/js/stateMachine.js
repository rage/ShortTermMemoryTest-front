
var stateMachine = function (){
	console.log("stateMachine");
	
	var login;
	var state;
	var register;
    var game;
    var username;
	
	
	
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
		register = new CreateUser();
		register.start();
        console.log("cu !!!");
	}
	
	function startGameStartScreen(){
		state = 3;
		startScreen = new GameStartScreen();
		startScreen.start();
	}
    
    function createUser(){
        console.log("singup");
        register.signup();
    }
	
	function startGame(){
		state = 4;
        game = new ShowNumbers();
        game.startShowing();
		console.log("hellowWWW!")
	}
	
	
	return {
		start:start, 
		startRegister:startRegister, 
		startGameStartScreen:startGameStartScreen, 
		createUser:createUser,
        startGame:startGame,
		login:function (){
			return login
		}
	}
	
}();
