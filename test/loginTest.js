

describe("LoginTest", function() {

    it("checkUsername return false when user not found ", function() {

        var settings = new Settings();
        var myfunc = new Login(settings);
        var us = new User();

        expect(myfunc.checkUsername("asdasdofiafjpioasdfsdfsdfufi", us)).toBe(false);

    });
    it("checkUsername return true when user found", function() {

        var settings = new Settings();
        var myfunc = new Login(settings);
        var us = new User();

        expect(myfunc.checkUsername("Olen", us)).toBe(true);

    });
    it("checkUsername return true when user found", function() {
        stateMachine.start();
        document.getElementById('username').value = "Olen";

        var o = stateMachine.checkUsername(document.getElementById('username').value);
        expect(document.getElementById("Notification").innerHTML).toBe(text["testinTarkoitus"]);

    });
    
    it("autocomplete off", function() {
        
        
        stateMachine.start();
        expect(document.getElementById('username').autocomplete).toBe("off");
    });


});
