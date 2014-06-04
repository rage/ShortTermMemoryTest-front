

describe("LoginTest", function() {

    it("checkUsername return false when user not found ", function() {

        var myfunc = new Login();

        expect(myfunc.checkUsername("asdasdofiafjpioasdfsdfsdfufi")).toBe(false);

    });
    it("checkUsername return true when user found", function() {

        var myfunc = new Login();

        expect(myfunc.checkUsername("Olen")).toBe(true);

    });
    it("checkUsername return true when user found", function() {
        stateMachine.start();
        document.getElementById('username').value = "Olen";

        var o = stateMachine.checkUsername(document.getElementById('username').value);
        expect(o).toBe(true);

    });
    
    it("autocomplete off", function() {
        
        
        stateMachine.start();
        expect(document.getElementById('username').autocomplete).toBe("off");
    });


});
