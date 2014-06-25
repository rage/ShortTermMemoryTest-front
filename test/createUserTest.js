
describe("login and createUser", function() {

    it("when user not found start createUser (1)", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start();
        document.getElementById('username').value = text;
        checkName(document.getElementById('username').value);
        document.getElementById("yearofbirth").selectedIndex = 2000;
        document.getElementById('m').checked = true;
        document.getElementById('r').checked = true;
        var element = document.getElementById('yearofbirth');
        element.value = 1999;
        var element = document.getElementById('education');
        element.value = "Peruskoulu";
        stateMachine.createUser();
        expect(document.getElementById("Notification").innerHTML).toBe("<p>Seuraavassa tehtävässä tutkitaan lyhytaikaista muistia.</p><p>Lue tehtävän ohjeet tarkasti ennen kuin aloitat.</p><p>Pääset tehtävään VÄLILYÖNNILLÄ.</p>");
    });
    
    it("when user not found start createUser (2)", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start();
        document.getElementById('username').value = text;
        checkName(document.getElementById('username').value);
        document.getElementById('m').checked = true;
        document.getElementById('l').checked = true;
        var element = document.getElementById('yearofbirth'); 
        element.value = 2014;
        var element = document.getElementById('education');
        element.value = "Lukio tai ammattikoulu";
        stateMachine.createUser();
        expect(document.getElementById("Notification").innerHTML).toBe("<p>Seuraavassa tehtävässä tutkitaan lyhytaikaista muistia.</p><p>Lue tehtävän ohjeet tarkasti ennen kuin aloitat.</p><p>Pääset tehtävään VÄLILYÖNNILLÄ.</p>");

    });
    
    it("when user not found start createUser (3)", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start();
        document.getElementById('username').value = text;
        checkName(document.getElementById('username').value);
        document.getElementById("yearofbirth").selectedIndex = 2000;
        document.getElementById('f').checked = true;
        document.getElementById('r').checked = true;
        var element = document.getElementById('yearofbirth');
        element.value = 1900;
        var element = document.getElementById('education');
        element.value = "Korkeakoulu";
        stateMachine.createUser();
        expect(document.getElementById("Notification").innerHTML).toBe("<p>Seuraavassa tehtävässä tutkitaan lyhytaikaista muistia.</p><p>Lue tehtävän ohjeet tarkasti ennen kuin aloitat.</p><p>Pääset tehtävään VÄLILYÖNNILLÄ.</p>");

    });


    it("should fail when empty handedness", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start();
        document.getElementById('username').value = text;
        checkName(document.getElementById('username').value);
        document.getElementById("yearofbirth").selectedIndex = 2000;
        document.getElementById('f').checked = true; 
        var element = document.getElementById('yearofbirth');
        element.value = 1999;
        var element = document.getElementById('education');
        element.value = "Peruskoulu";
        stateMachine.createUser();
        expect(document.getElementById("varoitus").innerHTML).toBe("");

    });
    it("should fail when empty gender", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start();
        document.getElementById('username').value = text;
        checkName(document.getElementById('username').value);
        document.getElementById("yearofbirth").selectedIndex = 2000;
        document.getElementById('r').checked = true;
        var element = document.getElementById('yearofbirth');
        element.value = 1999;
        var element = document.getElementById('education');
        element.value = "Peruskoulu";
        stateMachine.createUser();
        expect(document.getElementById("varoitus").innerHTML).toBe("");

    });
    it("should fail when empty education", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start(); 
        document.getElementById('username').value = text;
        checkName(document.getElementById('username').value);
        document.getElementById('m').checked = true;
        document.getElementById("yearofbirth").selectedIndex = 2000; 
        var element = document.getElementById('yearofbirth');
        element.value = 1999;
        stateMachine.createUser();
        expect(document.getElementById("varoitus").innerHTML).toBe("");

    });
    it("should fail when empty yearofbirth", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start();
        document.getElementById('username').value = text;
        checkName(document.getElementById('username').value);
        document.getElementById('f').checked = true;
        var element = document.getElementById('education');
        element.value = "Peruskoulu";
        stateMachine.createUser();
        expect(document.getElementById("varoitus").innerHTML).toBe("");

    });
    it("should fail when empty education", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start();
        document.getElementById('username').value = text;
        checkName(document.getElementById('username').value);
        document.getElementById('f').checked = true;
        var element = document.getElementById('yearofbirth');
        element.value = 1999;
        stateMachine.createUser();
        expect(document.getElementById("varoitus").innerHTML).toBe("");

    });
});
