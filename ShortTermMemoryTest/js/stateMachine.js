
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
                guessTime: 2000,
                showResultTime: 5000,
                showCrossDelay: 1000,
                showCrossTime: 500,
                numberList: theNumberList,
                numberListIndex: 0,
                result: undefined,
                mode: mode,
                maxPracticeRounds: 3,
                donePracticeRounds: 0,
                fails: [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]], //index [7][0] refers to the normal 7 number series and [6][1] to the reversed 6 number series
                shownSeries: theNumberList.clone,
                updateFails: function(eventHandler){
                    var fail = new calculateResult(eventHandler.getStoredEvents(), 0).lastSeriesFailed;
                    var seriesLength = this.numberList[this.numberListIndex].numbers.length;
                    var a=this.currentListDirection();
                    if (fail && seriesLength >= droppedSeriesMinLength) {
                        this.fails[seriesLength][a]++;
                    } else {
                        this.fails[seriesLength][a]=0;
                    }
                },
                updateNumberListIndex: function() {
                    this.numberListIndex++;
                    var a=this.currentListDirection();
                    while (this.numberListIndex < this.numberList.length && this.fails[this.numberList[this.numberListIndex].numbers.length][a] > maxFails) {
                        this.shownSeries[this.numberListIndex]=false;
                        this.numberListIndex++;
                        a = this.currentListDirection();

                    }
                },
                currentListDirection: function(){ //0 = upwards, 1=backwards

                    var a;
                    var i = this.numberListIndex;
                    if(i<this.numberList.length){
                        if(this.numberList[i].order == "upwards"){
                            a=0;
                        } else if(this.numberList[i].order == "backwards"){
                            a=1;
                        }
                    }
                    return a;

                }
            };

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
