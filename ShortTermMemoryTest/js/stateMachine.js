var show;
var username;
var url = "http://shorttermmemorytest.herokuapp.com/";
//var url = "http://localhost:3000/"

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

    function startGameStartScreen(){
        state = 3;
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
            theNumberList = list.getNextList();
        } else if (mode == "PRACTICE") {
            theNumberList = createMockNumberList();
        }

        var gameData = {
            gameIdentifier      : "ThisGame",
            numberDisplayTime   : 500,
            ISITime             : 1500,
            guessTime           : 5000,
            showResultTime      : 5000,
            showCrossDelay      : 1000,
            showCrossTime       : 1000,
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
