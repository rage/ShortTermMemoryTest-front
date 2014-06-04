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

        startLogin();
        //startGame();
        //startGameStartScreen(); //For debugging purposes, skip login
    }

    function startLogin(){

        state = 1;
        login = new Login();
        login.start();

    }


    function startRegister(){

        state = 2;
        register = new CreateUser();
        register.start();

    }

    function startNotification(){
        state = 3;
    }

    function startGameStartScreen(){

        state = 4;
        startScreen = new GameStartScreen();
        startScreen.start();

    }

    function createUser(){
        return register.signup();
    }

    function startGame(mode) {

        state = 4;

        var theNumberList;

        if (mode == "GAME") {
            var list = new GetList();
            //theNumberList = list.getNextList();
            theNumberList = createMockNumberList();
        } else if (mode == "PRACTICE") {
            theNumberList = createMockNumberList();
        }

        var gameData = {
            gameIdentifier      : "ThisGame",
            numberDisplayTime   : 5,
            ISITime             : 1,
            guessTime           : 5,
            showResultTime      : 5,
            showCrossDelay      : 1,
            showCrossTime       : 1,
            numberList          : theNumberList,
            numberListIndex     : 0,
            result              : undefined,
            mode                : mode,
            maxPracticeRounds   : 3,
            donePracticeRounds  : 0
        };


        game.start(gameData);
        
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
        login:function (){
            return login
        }
    }
}();
