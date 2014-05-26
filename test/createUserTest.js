
describe("login and createUser", function() {

    it("when user not found start createUser (1)", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start();
        document.getElementById('username').value = text;
        stateMachine.login().checkUsername(document.getElementById('username').value);
        document.getElementById("education").selectedIndex = "Lukio tai ammattikoulu";
        document.getElementById("yearofbirth").selectedIndex = 2000;
        document.getElementById('m').checked = true;
        document.getElementById('r').checked = true;
        var element = document.getElementById('yearofbirth');
        element.value = 1999;
        expect(stateMachine.createUser()).toBe(true);

    });
    
    it("when user not found start createUser (2)", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start();
        document.getElementById('username').value = text;
        stateMachine.login().checkUsername(document.getElementById('username').value);
        document.getElementById("education").selectedIndex = "Korkeakoulu";
        document.getElementById("yearofbirth").selectedIndex = 2000;
        document.getElementById('m').checked = true;
        document.getElementById('l').checked = true;
        var element = document.getElementById('yearofbirth');
        element.value = 2014;
        expect(stateMachine.createUser()).toBe(true);

    });
    
    it("when user not found start createUser (3)", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start();
        document.getElementById('username').value = text;
        stateMachine.login().checkUsername(document.getElementById('username').value); 
        document.getElementById("education").selectedIndex = "Peruskoulu";
        document.getElementById("yearofbirth").selectedIndex = 2000;
        document.getElementById('f').checked = true;
        document.getElementById('r').checked = true;
        var element = document.getElementById('yearofbirth');
        element.value = 1900;
        expect(stateMachine.createUser()).toBe(true);

    });


    it("should fail when empty handedness", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start();
        document.getElementById('username').value = text;
        stateMachine.login().checkUsername(document.getElementById('username').value); 
        document.getElementById("education").selectedIndex = "Peruskoulu";
        document.getElementById("yearofbirth").selectedIndex = 2000;
        document.getElementById('f').checked = true; 
        var element = document.getElementById('yearofbirth');
        element.value = 1999;
        expect(stateMachine.createUser()).toBe(false);

    });
    it("should fail when empty gender", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start();
        document.getElementById('username').value = text;
        stateMachine.login().checkUsername(document.getElementById('username').value); 
        document.getElementById("education").selectedIndex = "Peruskoulu";
        document.getElementById("yearofbirth").selectedIndex = 2000;
        document.getElementById('f').checked = true; 
        var element = document.getElementById('yearofbirth');
        element.value = 1999;
        expect(stateMachine.createUser()).toBe(false);

    });
});
