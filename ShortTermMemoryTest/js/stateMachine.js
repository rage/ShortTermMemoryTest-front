var show;
var stateMachine = function (){
	console.log("stateMachine");
	
	var login;
	var state;
	var register;
    var game;
    var username;

    var evStore;
    var keyHandler;

	function start(){
		console.log("Start");

        evStore =  new eventStorer();
        keyHandler = new keyEventHandler(evStore);

		startLogin();
        //startGame(); //For debugging purposes, skip login
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
        evStore.registerEvent("EVENT_START_GAME", "GAME_IDENTIFIER_BLAHBLAH", Date.now());
        keyHandler.activate();

        var numberList = [];
        for(i=0; i<3; i++) {
            var numberSeries = [];
            var numbers = [];
            for (x = 0; x < 3; x++) {
                var number = x;
                numbers[x] = x + i + 2;
            }
            numberSeries.order = "backwards"
            numberSeries.numbers = numbers;
            numberList[i]=numberSeries;
        }

        show = new showList(evStore,numberList, 100, 50, 1000);
        show.showNext();

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
