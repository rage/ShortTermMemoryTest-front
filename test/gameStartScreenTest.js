

describe("StartScreenTest", function() {

    it("try start game without practice", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start();
        document.getElementById('username').value = text;
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
        expect(document.getElementById("startScreen").value).toBe(text["ohjeHarjoitteluSuorittamatta"]);

    });

});
