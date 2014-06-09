
describe("As a new User, I want to see instructions", function() {
  
    beforeEach(function() {

        $(document).off();
        evHandler = new eventHandler();
        keyHandler = new keyEventHandler(evHandler);
        game = new gameLogic(evHandler);

        jasmine.clock().install();
        jasmine.clock().tick(200);
        spaceKeyDownEvent = jQuery.Event("keydown");
        spaceKeyDownEvent.keyCode = 32;
        spaceKeyUpEvent = jQuery.Event("keyup");
        spaceKeyUpEvent.keyCode = 32;

        enterKeyDownEvent = jQuery.Event("keydown");
        enterKeyDownEvent.keyCode = 13;
        enterKeyUpEvent = jQuery.Event("keyup");
        enterKeyUpEvent.keyCode = 13;
        gameData = {
            gameIdentifier: "ThisGame",
            numberDisplayTime: 500,
            ISITime: 1500,
            guessTime: 5000,
            showResultTime: 5000,
            numberList: undefined,
            numberListIndex: 0,
            result: undefined,
            mode: "PRACTICE",
            maxPracticeRounds: 3,
            donePracticeRounds: 0,
            gameStartTime : 0
        };
    });
    
    function simulateKeyPress(c) {
        console.log(c);
        jQuery.event.trigger({ type : 'keypress', which : c });
    }

    
    it("instructions", function(done) {
 
        stateMachine.start();


        document.getElementById('username').value = "Omena";
        stateMachine.checkUsername("Omena")
		done();

    });
    it("instructions2", function(done) {
        expect(document.getElementById("Notification").innerHTML).toBe(text["testinTarkoitus"]);

        simulateKeyPress(32);
        done();

    });
    it("instructions3", function(done) {
        expect(document.getElementById("startScreen").innerHTML).toBe(text["ohje"]);

        simulateKeyPress(32);
        done();

    });

    it("instructions4", function() {
        expect(document.getElementById("PracticeStart").innerHTML).toBe(text["harjoittelunAloitushje"]);


    });

    it("instructions5", function() {
        jasmine.clock().tick(20000);

        simulateKeyPress(32);
        jasmine.clock().tick(20000);


        expect(document.body.innerHTML).toBe(text["harjoittelunAloitushje"]);


    });
 


});
