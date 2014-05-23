

describe("LoginTest", function() {

    it("checkUsername return false when user not found ", function() {

        var myfunc = new Login();
        
        expect(myfunc.checkUsername("asdasdofiafjpioasdfsdfsdfufi")).toBe(false);

    });
    it("checkUsername return true when user found", function() {

        var myfunc = new Login();
        
        expect(myfunc.checkUsername("Olen")).toBe(true);

    });

});
