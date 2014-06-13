
var show;
var testcase_id;


var stateMachine = function (){

    var login;
    var state;
    var register;
    var game;
    var user;

    var evHandler;
    var keyHandler;

    var kList;

    function start(){

        kList = new KeyListener();
        state = new State(kList);

        evHandler = new eventHandler();
        keyHandler = new keyEventHandler(evHandler);
        game = new gameLogic(evHandler);
        user = new User();

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

    function checkUsername(checkName){

        if(state.is(1)) {
            if(login.checkUsername(checkName, user)){
                stateMachine.startNotification();
            }else{
                stateMachine.startRegister();
            }
        }

    }


    function startRegister(){

        if(state.set(2)) {
            register = new CreateUser();
            register.start();
        }

    }

    function createUser(){

        if(state.is(2)) {
            if(register.signup(user)){
                stateMachine.startNotification();
            }else{
                stateMachine.startRegister();
            }
        }

    }

    function startNotification(){

        if(state.set(3)) {
            var notification = new Notification();
            kList.set(notification.keyPress);
            notification.start();
        }

    }

    function startGameStartScreen(){

        if(state.set(4)) {
            var startScreen = new GameStartScreen(user);
            kList.set(startScreen.keyPress);
            startScreen.start();
        }

    }

    function startWaitPractice(){

        if(state.set(5)) {
            var waitPractice = new WaitPractiseStart();
            kList.set(waitPractice.keyPress);
            waitPractice.start();
        }

    }

    function startGame(mode) {

        if(state.set(6)) {

            var theNumberList;
            var list = new GetList(user);

            if (mode == "GAME") {
                theNumberList = list.getNextList();
            } else if (mode == "PRACTICE") {
                theNumberList = list.getTrainingList();
            }

            var gameData = new GameData(mode,theNumberList, gameSettings);

            game.start(gameData);

        }

    }

    return {
        start:start,
        startRegister:startRegister,
        startGameStartScreen:startGameStartScreen,
        createUser:createUser,
        startGame:startGame,
        startNotification:startNotification,
        checkUsername:checkUsername,
        startWaitPractice:startWaitPractice
    }
}();
