

describe("StartScreenTest", function() {

    it("check start screen text when user is new and try press enter and check again", function() {
        var randomUser = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            randomUser += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start();
        document.getElementById('username').value = randomUser;
        stateMachine.checkUsername(document.getElementById('username').value);
        document.getElementById("yearofbirth").selectedIndex = 2000;
        document.getElementById('m').checked = true;
        document.getElementById('r').checked = true;
        var element = document.getElementById('yearofbirth');
        element.value = 1999;
        var element = document.getElementById('education');
        element.value = "Peruskoulu";
        stateMachine.createUser();
        stateMachine.startGameStartScreen();
        expect(document.getElementById("startScreen").innerHTML).toBe(text["ohjeHarjoitteluSuorittamatta"]);

        function simulateKeyPress(c) {
            jQuery.event.trigger({ type : 'keypress', which : c });
        }
        simulateKeyPress(13);

        expect(document.getElementById("startScreen").innerHTML).toBe(text["ohjeHarjoitteluSuorittamatta"]);
    });

    it("check start screen text when user is trained", function() {
        stateMachine.start();
        document.getElementById('username').value = "Omena";
        stateMachine.checkUsername(document.getElementById('username').value);
        stateMachine.startGameStartScreen();
        expect(document.getElementById("startScreen").innerHTML).toBe(text["ohje"]);
    });


    it("use startscreen in keyboard", function() {
        stateMachine.start();
        document.getElementById('username').value = "Omena";
        stateMachine.checkUsername(document.getElementById('username').value);
        stateMachine.startGameStartScreen();
        function simulateKeyPress(c) {
            jQuery.event.trigger({ type : 'keypress', which : c });
        }
        expect(document.getElementById("startScreen").innerHTML).toBe(text["ohje"]);
        simulateKeyPress(32);
        expect(document.getElementById("startScreen")).toBe(null);
        expect(document.getElementById("PracticeStart").innerHTML).toBe(text["harjoittelunAloitushje"]);
    });

    it("use startscreen in keyboard 2", function() {
        stateMachine.start();
        document.getElementById('username').value = "Omena";
        stateMachine.checkUsername(document.getElementById('username').value)

        function simulateKeyPress(c) {
            jQuery.event.trigger({ type : 'keypress', which : c });
        }
        simulateKeyPress(32);
        simulateKeyPress(13);
        expect(document.getElementById("startScreen")).toBe(null);
    });

});

