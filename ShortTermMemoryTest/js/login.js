function Login(settings, state, user){

    checkName = checkUsername;

    function start(){
        createHtml();
    }
    
    function createHtml(){
        document.body.innerHTML = '<div id="login">\
        ' + text["kirjoitaTunnus"] + '\
        <form onSubmit="checkName(document.getElementById(\'username\').value)">\
        <input type="text" id="username" autocomplete="off" autofocus required>\
        <input type="button" value="'+text['aloita']+'" onclick="checkName(document.getElementById(\'username\').value)" />\
        </form>';
    }
    
    function checkUsername(checkThisName){

        var req = new Request();

        var params = new Params();
        params.add("username", checkThisName);

        user.set(checkThisName);

        var jsonData = req.createPost(settings.url + "login", params.toString());
        var response = JSON.parse(jsonData);

        if(checkResponse(response, user)){
            state.change(3);
        }else{
            state.change(2);
        }

    }

    function checkResponse(response, user){

        user.setTrained(response.isTrained);
        return response.isReserved;

    }
    

    return {
        start:start,
        checkUsername:checkUsername
    };
}
