function Login(settings, state, user){

    checkName = checkUsername;

    function start(){
        createHtml();
    }
    
    function createHtml(){


        var gui = new GUI();

        gui.createNew([
            {
                "type": "div",
                "id": "login",
                "elements":[
                    {
                        "type": "p",
                        "id": "write",
                        "text": "kirjoitaTunnus"
                    },
                    {
                        "type": "form",
                        "id": "loginScreen",
                        "onSubmit": "checkName(document.getElementById('username').value)",
                        "elements":
                            [
                                {
                                    "type": "input",
                                    "id": "username",
                                    "inputType": "text",
                                    "autocomplete": "off",
                                    "autofocus": "true"
                                },
                                {
                                    "type": "input",
                                    "id": "button",
                                    "inputType": "button",
                                    "valueText": "aloita",
                                    "onclick": "checkName(document.getElementById('username').value)"
                                }
                            ]
                    }
                ]
            }
        ]);
    }
    
    function checkUsername(checkThisName){

        var req = new Request();

        var params = new Params();
        params.add("username", checkThisName);

        user.set(checkThisName);

        var jsonData = req.createPost(settings.url + "login", params.toString());
        var response = JSON.parse(jsonData);

        if(checkResponse(response, user)){
            state.change(4);
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
