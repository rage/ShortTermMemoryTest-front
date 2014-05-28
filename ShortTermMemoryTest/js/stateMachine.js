var show;
var username;
var stateMachine = function (){
    console.log("stateMachine");

    var login;
    var state;
    var register;
    var game;

    var evHandler;
    var keyHandler;

    function start(){
        console.log("Start");

        evHandler = new eventHandler();
        keyHandler = new keyEventHandler(evHandler);

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
        return register.signup();
    }

    function startGame(mode) {
        state = 4;
        /*
        evStore.registerEvent("EVENT_START_GAME", "GAME_IDENTIFIER_BLAHBLAH", Date.now());
        keyHandler.activate();
        
        var list = new GetList(1);
        
        var numberList = [];
        for(var i=0; i<list.length; i++) {
            var numberSeries = [];
            var numbers = [];
            for (var x = 0; x < list[i]["numbers"].length; x++) {
                var number = x;
                numbers[x] = list[i]["numbers"][x]["text"];
            }
            
            numberSeries.order = "NORMAL";
            
            numberSeries.numbers = numbers;
            console.log(numbers);
            numberList[i]=numberSeries;


        }
        
        console.log(numberList);

        console.log(numberList[0]);

        show = new showList(evStore,numberList, 1000, 500, 10000);

        show.showNext();
        */

        var mockNumberList = createMockNumberList();

        var gameData = {
            gameIdentifier      : "ThisGame",
            numberDisplayTime   : 500,
            ISITime             : 1500,
            guessTime           : 5000,
            showResultTime      : 5000,
            numberList          : mockNumberList,
            numberListIndex     : 0,
            eventHandler        : evHandler,
            result              : undefined,
            mode                : mode
        };

        game = new gameLogic(gameData);
        game.start();

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
                numberSeries.order = "REVERSE";
            } else {
                numberSeries.order = "NORMAL";
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
