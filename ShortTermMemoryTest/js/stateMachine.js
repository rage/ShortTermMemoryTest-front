var stateMachine = function (){

    var login;
    var state;
    var register;
    var game;
    var user;
    var settings;

    var evHandler;
    var keyHandler;

    var kList;

    function start(){

        kList = new KeyListener();
        state = new State(kList);
        state.addStateFunction(1, startLogin);
        state.addStateFunction(2, startRegister);
        state.addStateFunction(3, startNotification);
        state.addStateFunction(4, startGameStartScreen);
        state.addStateFunction(5, startWaitPractice);
        state.addStateFunction(6, startPractice);
        state.addStateFunction(7, startTest);

        user = new User();
        settings = new Settings();

        evHandler = new EventHandler();
        keyHandler = new KeyEventHandler(evHandler);
        var postLogs = new Logs(user, settings);
        game = new GameLogic(evHandler, user, settings, postLogs, state);

        state.change(1);
        
    }

    function startLogin(){

        login = new Login(settings, state, user);
        login.start();

    }

    function startRegister(){

        register = new CreateUser(settings);
        register.start();

    }

    function createUser(){

        if(state.is(2)) {
            if(register.signup(user)){
                state.change(3);
            }else{
                startRegister();
            }
        }

    }

    function startNotification(){

        var notification = new Notification(state);
        kList.set(notification.keyPress);
        notification.start();

    }

    function startGameStartScreen(){

        var startScreen = new GameStartScreen(user, state);
        kList.set(startScreen.keyPress);
        startScreen.start();

    }

    function startWaitPractice(){

        var waitPractice = new WaitPractiseStart(state);
        kList.set(waitPractice.keyPress);
        waitPractice.start();

    }

    function startPractice(){
        startGame("PRACTICE");
    }

    function startTest(){
        startGame("GAME");
    }

    function startGame(mode) {

        if(state.is(6) || state.is(7)){
            var theNumberList;
            var list = new GetList(user, settings);

            if (mode === "GAME") {
                theNumberList = list.getNextList();
            } else {
                theNumberList = list.getTrainingList();
            }
            /* global gameData */
            var gameData = new GameData(mode, theNumberList, settings);

            game.start(gameData);
        }

    }

    return {
        start:start,
        startGameStartScreen:startGameStartScreen,
        createUser:createUser,
        startGame:startGame
    };
    
}();
