
describe("As a old User, I want to see instructions", function() {

    beforeEach(function() {

        $(document).off();
        evHandler = new eventHandler();
        keyHandler = new keyEventHandler(evHandler);
        game = new gameLogic(evHandler);

        jasmine.clock().install();
        jasmine.clock().tick(200);
    });

    function simulateKeyPress(c) {
        jQuery.event.trigger({ type : 'keypress', which : c });
    }


    it("instructions", function(done) {

        stateMachine.start();


        document.getElementById('username').value = "Omena";
        stateMachine.checkUsername("Omena");
        done();

    });
    it("instructions2", function(done) {
        expect(document.getElementById("Notification").innerHTML).toBe(text["testinTarkoitus"]);

        simulateKeyPress(32);
        done();

    });
    it("instructions3", function(done) {
        expect(document.getElementById("startScreenP1").innerHTML).toBe(text["ohje1"]);
        simulateKeyPress(32);
        expect(document.getElementById("startScreenP2").innerHTML).toBe(text["ohje2"]);
        expect(document.getElementById("startScreenP1").style.display).toBe("none");
        expect(document.getElementById("startScreenP2").style.display).toBe("inline");
        simulateKeyPress(32);
        expect(document.getElementById("startScreenP3").innerHTML).toBe(text["ohje3"]);
        expect(document.getElementById("startScreenP1").style.display).toBe("none");
        expect(document.getElementById("startScreenP2").style.display).toBe("none");
        expect(document.getElementById("startScreenP3").style.display).toBe("inline");

        simulateKeyPress(32);
        done();

    });

    it("instructions4", function() {
        expect(document.getElementById("PracticeStart").innerHTML).toBe(text["harjoittelunAloitushje"]);
    });


    it("instructions5", function() {

        simulateKeyPress(32);
        jasmine.clock().tick(20000);
        expect(document.getElementById("secondline").innerHTML).toBe(text["vaarinIlmoitus"]);

        simulateKeyPress(32);
        jasmine.clock().tick(20000);
        expect(document.getElementById("secondline").innerHTML).toBe(text["vaarinIlmoitus"]);
        new simulateKeyPress(32);
        expect(document.getElementById("secondline").innerHTML).toBe(text["vaarinIlmoitus"]);
        new simulateKeyPress(32);
        jasmine.clock().tick(20000);

    });



});


describe("As a old User, I want to see instructions 2", function() {

    beforeEach(function() {

        $(document).off();
        evHandler = new eventHandler();
        keyHandler = new keyEventHandler(evHandler);
        game = new gameLogic(evHandler);

        jasmine.clock().install();
        jasmine.clock().tick(200);
    });

    function simulateKeyPress(c) {
        jQuery.event.trigger({ type : 'keypress', which : c });
    }


    it("instructions", function(done) {

        stateMachine.start();


        document.getElementById('username').value = "Omena";
        stateMachine.checkUsername("Omena");
        done();

    });
    it("instructions2", function(done) {

        simulateKeyPress(32);
        done();

    });
    it("instructions3", function(done) {
        simulateKeyPress(32);
        simulateKeyPress(32);
        simulateKeyPress(32);
        done();

    });

    it("instructions4", function() {
    });


    it("instructions5", function() {

        simulateKeyPress(32);
        jasmine.clock().tick(20000);

        simulateKeyPress(32);
        jasmine.clock().tick(20000);

        new simulateKeyPress(32);
        jasmine.clock().tick(20000);

    });



});


describe("As a new User, I want to see instructions", function() {

    beforeEach(function() {

        $(document).off();
        evHandler = new eventHandler();
        keyHandler = new keyEventHandler(evHandler);
        game = new gameLogic(evHandler);

        jasmine.clock().install();
        jasmine.clock().tick(200);
    });

    function simulateKeyPress(c) {
        jQuery.event.trigger({ type : 'keypress', which : c });
    }


    it("instructions", function(done) {

        stateMachine.start();

        var randomUser = "OlenJokin";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            randomUser += possible.charAt(Math.floor(Math.random() * possible.length));

        document.getElementById('username').value = randomUser;
        username = randomUser;
        userIsTrained = false;
        stateMachine.checkUsername(randomUser);

        document.getElementById("yearofbirth").selectedIndex = 2000;
        document.getElementById('m').checked = true;
        document.getElementById('r').checked = true;
        var element = document.getElementById('yearofbirth');
        element.value = 1999;
        var element = document.getElementById('education');
        element.value = "Peruskoulu";
        expect(stateMachine.createUser()).toBe(true);

        expect(document.getElementById("Notification").innerHTML).toBe(text["testinTarkoitus"]);

        simulateKeyPress(32);

        expect(document.getElementById("startScreenP1").innerHTML).toBe(text["ohjeHarjoitteluSuorittamatta1"]);
        simulateKeyPress(32);
        expect(document.getElementById("startScreenP2").innerHTML).toBe(text["ohjeHarjoitteluSuorittamatta2"]);
        expect(document.getElementById("startScreenP1").style.display).toBe("none");
        expect(document.getElementById("startScreenP2").style.display).toBe("inline");
        simulateKeyPress(32);
        expect(document.getElementById("startScreenP3").innerHTML).toBe(text["ohjeHarjoitteluSuorittamatta3"]);
        expect(document.getElementById("startScreenP1").style.display).toBe("none");
        expect(document.getElementById("startScreenP2").style.display).toBe("none");
        expect(document.getElementById("startScreenP3").style.display).toBe("inline");

        jasmine.clock().tick(2000);

        simulateKeyPress(32);
        expect(document.getElementById("PracticeStart").innerHTML).toBe(text["harjoittelunAloitushje"]);
        new simulateKeyPress(32);
        jasmine.clock().tick(14000);
        /*
        expect(document.body.innerHTML).toBe(null);
        new simulateKeyPress(51);
        jasmine.clock().tick(100);
        new simulateKeyPress(50);
        jasmine.clock().tick(100);
        new simulateKeyPress(49);
        jasmine.clock().tick(100);
        new simulateKeyPress(48);
         //expect(document.body.innerHTML).toBe(null);
        jasmine.clock().tick(20000);


        simulateKeyPress(32);
        jasmine.clock().tick(20000);
        expect(document.getElementById("secondline").innerHTML).toBe(text["vaarinIlmoitus"]);

        simulateKeyPress(32);
        jasmine.clock().tick(20000);
        expect(document.getElementById("secondline").innerHTML).toBe(text["vaarinIlmoitus"]);
        new simulateKeyPress(32);
        expect(document.getElementById("secondline").innerHTML).toBe(text["vaarinIlmoitus"]);
        new simulateKeyPress(32);
        jasmine.clock().tick(20000);
        */
        done();
    });


});
