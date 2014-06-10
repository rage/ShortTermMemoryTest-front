function Login(){

    function start(){
        createHtml();
    }
    
    function createHtml(){
        document.body.innerHTML = '<div id="login">\
        ' + text["kirjoitaTunnus"] + '\
        <form onSubmit="stateMachine.checkUsername(document.getElementById(\'username\').value)">\
        <input type="text" id="username" autocomplete="off" autofocus required>\
        <input type="button" value="Aloita" onclick="stateMachine.checkUsername(document.getElementById(\'username\').value)" />\
        </form>';
    }
    
    function checkUsername(user){

        var req = new Request();
        var params = "username="+user;

        username = user;

        var jsonData = req.createPost(url+"login", params);
        var response = JSON.parse(jsonData);

        return checkResponse(response);

    }

    function checkResponse(response){

        if (response.isReserved) {

            if (response.isTrained) {
                userIsTrained = true;
            } else {
                userIsTrained = false;
            }

            stateMachine.startNotification();
            return true;


        } else {

            stateMachine.startRegister();
            return false;

        }

    }
    

    return {
        start:start,
        checkUsername:checkUsername
    }
}
