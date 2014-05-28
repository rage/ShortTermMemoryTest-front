var show;
var username;
var stateMachine = function (){
    console.log("stateMachine");

    var login;
    var state;
    var register;
    var game;

    var evStore;
    var keyHandler;

    function start(){
        console.log("Start");

        evStore = new eventStorer();
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
        return register.signup();
    }

    function startGame(){
        state = 4;
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
    }

    //evStore.registerEvent("EVENT_END_GAME", "GAME_IDENTIFIER_BLAHBLAH", Date.now());
    //var result = calculateResult(evStore);
    //showResult(result);



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
