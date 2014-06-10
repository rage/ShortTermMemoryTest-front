
var show;
var username;
var userIsTrained;
var testcase_id;


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

    function checkUsername(user){

        if(state.is(1)) {
            return login.checkUsername(user);
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
            return register.signup();
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

    function startWaitPractice(){

        if(state.set(5)) {
            var waitPractice = new WaitPractiseStart();
            waitPractice.start();
        }

    }

    function startGame(mode) {

        if(state.set(6)) {

            var theNumberList;
            var list = new GetList();
            if (mode == "GAME") {

                theNumberList = list.getNextList();
            } else if (mode == "PRACTICE") {
                theNumberList = list.getTrainingList();
            }

            var gameData = {
                gameIdentifier: "ThisGame",
                numberDisplayTime: 400,
                ISITime: 650,
                guessTime: 3000,
                showResultTime: 5000,
                showCrossDelay: 1000,
                showCrossTime: 1000,
                numberList: theNumberList,
                numberListIndex: 0,
                result: undefined,
                mode: mode,
                maxPracticeRounds: 3,
                donePracticeRounds: 0,
                fails: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                updateFails: function(eventHandler){
                    var fail = new calculateResult(eventHandler.getStoredEvents(), 0).lastSeriesFailed;
                    var seriesLength = this.numberList[this.numberListIndex].numbers.length;
                    if (fail && seriesLength >= droppedSeriesMinLength) {
                        this.fails[seriesLength]++;
                    } else {
                        this.fails[seriesLength]=0;
                    }
                    console.log(this.fails);
                },
                updateNumberListIndex: function() {
                    this.numberListIndex++;
                    while (this.numberListIndex < this.numberList.length && this.fails[this.numberList[this.numberListIndex].numbers.length] > maxFails) {
                        this.numberListIndex++;
                }
                console.log(this.numberListIndex);
            }
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
        checkUsername:checkUsername,
        startWaitPractice:startWaitPractice
    }
}();
