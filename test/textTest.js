jasmine.getEnv().defaultTimeoutInterval = 1000000000000000000000
describe("As a old User, I want to see instructions", function() {

    beforeEach(function() {

        $(document).off();
        settings = new Settings();
        evHandler = new EventHandler();
        keyHandler = new KeyEventHandler(evHandler);
        user = new User();
        game = new GameLogic(evHandler, user, settings, new Logs(user, settings));

        jasmine.clock().install();
        jasmine.clock().tick(100);
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

    it("instructions4", function(done) {
        expect(document.getElementById("PracticeStart").innerHTML).toBe(text["harjoittelunAloitushje"]);
        done();
    });


    it("instructions5", function(done) {

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
        done();

    });



});


describe("As a old User, I want to see instructions 2", function() {

    beforeEach(function() {

        $(document).off();
        settings = new Settings();
        evHandler = new EventHandler();
        keyHandler = new KeyEventHandler(evHandler);
        user = new User();
        game = new GameLogic(evHandler, user, settings, new Logs(user, settings));

        jasmine.clock().install();
        jasmine.clock().tick(100);
    });

    function simulateKeyPress(c) {
        jQuery.event.trigger({ type : 'keypress', which : c });
    }


    it("instructions", function() {

        stateMachine.start();


        document.getElementById('username').value = "Omena";
        stateMachine.checkUsername("Omena");

    });
    it("instructions2", function() {

        simulateKeyPress(32);


    });
    it("instructions3", function() {
        simulateKeyPress(32);
        simulateKeyPress(32);
        simulateKeyPress(32);


    });

    it("instructions4", function() {
    });


    it("instructions5", function() {

        function simulateKeyDown(c) {
            keyDownEvent = jQuery.Event("keydown");
            keyDownEvent.keyCode = c;
            $(document).trigger(keyDownEvent);
        }

        function simulateKeyUp(c) {
            keyUpEvent = jQuery.Event("keyup");
            keyUpEvent.keyCode = c;
            $(document).trigger(keyUpEvent);
        }

        simulateKeyPress(32);
        jasmine.clock().tick(20000);

        simulateKeyDown(32);
        jasmine.clock().tick(100);
        simulateKeyUp(32);
        jasmine.clock().tick(20000);





        simulateKeyDown(32);
        jasmine.clock().tick(100);
        simulateKeyUp(32);
        jasmine.clock().tick(20000);

        expect(document.getElementById('ResultEnd').innerHTML).toBe(text["vaarinIlmoitus"]+""+text["harjoitusValmis"]);

        simulateKeyDown(32);
        jasmine.clock().tick(100);
        simulateKeyUp(32);
        jasmine.clock().tick(20000);

        simulateKeyDown(32);
        jasmine.clock().tick(100);
        simulateKeyUp(32);
        jasmine.clock().tick(20000);

        simulateKeyDown(32);
        jasmine.clock().tick(100);
        simulateKeyUp(32);
        jasmine.clock().tick(20000);


        simulateKeyDown(32);
        jasmine.clock().tick(100);
        simulateKeyUp(32);
        jasmine.clock().tick(20000);

        simulateKeyDown(13);
        jasmine.clock().tick(100);
        simulateKeyUp(13);

        simulateKeyDown(32);
        jasmine.clock().tick(100);
        simulateKeyUp(32);
        jasmine.clock().tick(20000);

        simulateKeyDown(32);
        jasmine.clock().tick(100);
        simulateKeyUp(32);
        jasmine.clock().tick(20000);


        expect(document.getElementById('ResultEnd').innerHTML).toBe(text["vaarinIlmoitus"]+""+text["tehtavaAlkaa"]);

        simulateKeyDown(13);
        jasmine.clock().tick(100);
        simulateKeyUp(13);
        var settings = new Settings();
        while(document.getElementById('firstline')==null || document.getElementById('firstline').innerHTML!=text["kiitos"]){
            jasmine.clock().tick(settings.game.showResultTime/2);
        }
        expect(document.getElementById('firstline').innerHTML).toBe(text["kiitos"]);
        expect(document.getElementById('secondline').innerHTML).toBe("Sait tehtävästä 0% oikein");
        expect(document.getElementById('thirdline').innerHTML).toBe("Sivusto ohjaa sinut hetken kuluttua aloitussivulle.");

// while(document.getElementById('firstline')!=null){
// jasmine.clock().tick(2000);
// }
        jasmine.clock().tick(settings.game.showResultTime+2000);
        expect(document.body.innerHTML).toContain(text["kirjoitaTunnus"]);

    });


});


describe("As a new User, I want to see instructions", function() {

    beforeEach(function() {

        $(document).off();
        settings = new Settings();
        evHandler = new EventHandler();
        keyHandler = new KeyEventHandler(evHandler);
        user = new User();
        game = new GameLogic(evHandler, user, settings, new Logs(user, settings));

        jasmine.clock().install();
        jasmine.clock().tick(300);
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
        stateMachine.checkUsername(randomUser);

        document.getElementById("yearofbirth").selectedIndex = 2000;
        document.getElementById('m').checked = true;
        document.getElementById('r').checked = true;
        var element = document.getElementById('yearofbirth');
        element.value = 1999;
        var element = document.getElementById('education');
        element.value = "Peruskoulu";
        stateMachine.createUser();

        userIsTrained = false;

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

        done();
    });


});