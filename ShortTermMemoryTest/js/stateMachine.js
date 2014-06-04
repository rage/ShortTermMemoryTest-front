var stateMachine = function (){

    var login;
    var state;
    var register;
    var game;

    var evHandler;
    var keyHandler;

    function start(){

        evHandler = new eventHandler();
        keyHandler = new keyEventHandler(evHandler);
        game = new gameLogic(evHandler);
        state = new State();

        startLogin();
        //startGame();
        //startGameStartScreen(); //For debugging purposes, skip login
    }

    function startLogin(){

        if(state.set(1)){
            login = new Login();
            login.start();
        }

    }


    function startRegister(){

        if(state.set(2)) {
            register = new CreateUser();
            register.start();
        }

    }

    function startNotification(){

        if(state.set(3)) {
            var notification = new Notification();
            notification.start();
        }

    }

    function startGameStartScreen(){

        if(state.set(4)) {
            var startScreen = new GameStartScreen();
            startScreen.start();
        }

    }

    function createUser(){

        if(state.is(2)) {
            return register.signup();
        }

    }

    function startGame(mode) {

        if(state.set(5)) {

            var theNumberList;

            if (mode == "GAME") {
                var list = new GetList();
                theNumberList = list.getNextList();
            } else if (mode == "PRACTICE") {
                theNumberList = createMockNumberList();
            }

            var gameData = {
                gameIdentifier: "ThisGame",
                numberDisplayTime: 500,
                ISITime: 1500,
                guessTime: 5000,
                showResultTime: 5000,
                showCrossDelay: 1000,
                showCrossTime: 1000,
                numberList: theNumberList,
                numberListIndex: 0,
                result: undefined,
                mode: mode,
                maxPracticeRounds: 3,
                donePracticeRounds: 0
            };


            game.start(gameData);
        }
        
    }
    
    function createMockNumberList() {
        var numberList = [ ];
        for(var i = 0; i < 3; i++) {
            var numberSeries = {};
            numberSeries.numbers = [ ];
            for (var x = 0; x < 3; x++) {
                numberSeries.numbers[x] = x + i + 2;
            }
            if (i == 1) {
                numberSeries.order = "backwards";
            } else {
                numberSeries.order = "upwards";
            }
            //numberSeries.numbers = numbers;
            numberList[i] = numberSeries;
        }
        return numberList;
    }

    return {
        start:start,
        startRegister:startRegister,
        startGameStartScreen:startGameStartScreen,
        createUser:createUser,
        startGame:startGame,
        startNotification:startNotification,
        login:function (){
            return login
        }
    }
}();
