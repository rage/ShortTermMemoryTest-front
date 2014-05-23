
describe("login and createUser", function() {

    it("when user not found start createUser", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        stateMachine.start();
        document.getElementById('username').value = text;
        stateMachine.login().checkUsername(document.getElementById('username').value);
        document.getElementById("education").value = "lajsdfkjasf";
        document.getElementById("yearofbirth").selectedIndex = 2000;
        //document.forms[0].sex[0].checked;
        //document.forms[0].handedness[0].checked;
        //document.forms[0].yearofbirth[0].checked;
        document.getElementById('m').checked = true;
        document.getElementById('r').checked = true;
        //document.getElementByClass('handedness')[0].checked;
        var element = document.getElementById('yearofbirth');
        element.value = 1999;
        //document.getElementById("yearofbirth")[1].selectedIndex;
        
         
        expect(stateMachine.createUser()).toBe(true);

    });
});
