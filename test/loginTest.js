

describe("LoginTest", function() {

    it("checkUsername return false when user not found ", function() {

        var settings = new Settings();
        var stateMock = function() {
            var tila;
            function change(a){
                tila = a;
            }

            function getChange(){
                return tila
            }

            return {
                change:change,
                getChange:getChange
            }
        }();
        var userMock = function() {
            function set(a){
            }
            return {
                set:set
            }
        }();
        var myfunc = new Login(settings, stateMock, userMock);
        var us = new User();

        checkName("asdasdofiafjpioasdfsdfsdfufi", us);

        expect(stateMock.getChange()).toBe(2);

    });
    it("checkUsername return true when user found", function() {


        var stateMock = function() {
            var tila;
            function change(a){
                tila = a;
            }

            function getChange(){
                return tila
            }

            return {
                change:change,
                getChange:getChange
            }
        }();
        var userMock = function() {
            function set(a){
            }
            function setTrained(){
            }
            return {
                set:set,
                setTrained:setTrained
            }
        }();
        var settings = new Settings();
        var myfunc = new Login(settings, stateMock, userMock);
        var us = new User();

        checkName("Olen", us);

        expect(stateMock.getChange()).toBe(3);

    });
    it("checkUsername return true when user found", function() {
        stateMachine.start();
        document.getElementById('username').value = "Olen";

        var o = checkName(document.getElementById('username').value);
        expect(document.getElementById("Notification").innerHTML).toBe(text["testinTarkoitus"]);

    });
    
    it("autocomplete off", function() {
        
        
        stateMachine.start();
        expect(document.getElementById('username').autocomplete).toBe("off");
    });


});
