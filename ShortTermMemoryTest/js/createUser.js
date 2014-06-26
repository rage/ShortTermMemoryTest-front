function CreateUser(settings, user, state){

    createUser = signUp;

    function start(){
        createHtml();
    }
    
    function createHtml(){
        
        var year = new Date().getFullYear();
        var years = [];
        years.push({
            "id":"valitse",
            "type": "option",
            "value": "valitse",
            "thisText": "Valitse"
        });

        for (var i = year; i >= 1900; i--) {
            years.push({
                "id":"valitse",
                "type": "option",
                "value": i,
                "thisText": i
            });
        }

        var gui = new GUI();

        gui.createNew([
            {
                "type": "div",
                "id": "createUser",
                "elements":[
                    {
                        "type": "div",
                        "id": "varoitus"
                    },
                    {
                        "type": "p",
                        "id": "userInf",
                        "text": "henkilotiedot"
                    },
                    {
                        "type": "form",
                        "id": "createUserForm",
                        "onSubmit": "stateMachine.createUser()",
                        "elements":[
                            {
                                "type": "table",
                                "id": "createUserTable",
                                "elements":[
                                    {
                                        "type": "tr",
                                        "id":"gender",
                                        "elements":[
                                            {
                                                "type": "td",
                                                "id": "genderText",
                                                "text": 'sukupuoli'
                                            },
                                            {
                                                "type": "td",
                                                "id": "genderInputs",
                                                "elements": [
                                                    {
                                                        "type": "input",
                                                        "name": "sex",
                                                        "class": "sex",
                                                        "value": "m",
                                                        "id": "m",
                                                        "inputType": "radio"
                                                    },
                                                    {
                                                        "type": "spawn",
                                                        "text":'mies'
                                                    },
                                                    {
                                                        "type": "input",
                                                        "name": "sex",
                                                        "class": "sex",
                                                        "value": "f",
                                                        "id": "f",
                                                        "inputType": "radio"
                                                    },
                                                    {
                                                        "type": "spawn",
                                                        "text": 'nainen'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "tr",
                                        "id":"yearOfBirths",
                                        "elements":[
                                            {
                                                "type": "td",
                                                "id": "yearOfBirthText",
                                                "text": "syntymavuosi"
                                            },
                                            {
                                                "type": "td",
                                                "id": "yearOfBirthSelectList",
                                                "elements":[
                                                    {
                                                        "type": "select",
                                                        "name": "yearofbirth",
                                                        "id": "yearofbirth",
                                                        "elements":
                                                            years


                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "tr",
                                        "id":"handedness",
                                        "elements":[
                                            {
                                                "type": "td",
                                                "id": "handednessText",
                                                "text": 'katisyys'
                                            },
                                            {
                                                "type": "td",
                                                "id": "handednessInputs",
                                                "elements": [
                                                    {
                                                        "type": "input",
                                                        "name": "handedness",
                                                        "value": "r",
                                                        "id": "r",
                                                        "inputType": "radio"
                                                    },
                                                    {
                                                        "type": "spawn",
                                                        "text": 'oikea'
                                                    },
                                                    {
                                                        "type": "input",
                                                        "name": "handedness",
                                                        "value": "l",
                                                        "id": "l",
                                                        "inputType": "radio"
                                                    },
                                                    {
                                                        "type": "spawn",
                                                        "text":'vasen'
                                                    }
                                                ]
                                            }
                                        ]

                                    },
                                    {
                                        "type": "tr",
                                        "id":"educations",
                                        "elements":[
                                            {
                                                "type": "td",
                                                "id": "educationText",
                                                "text": "koulutustausta"
                                            },
                                            {
                                                "type": "td",
                                                "id": "educationList",
                                                "elements":[
                                                    {
                                                        "type": "select",
                                                        "name": "education",
                                                        "id": "education",
                                                        "elements":[
                                                            {
                                                                "type": "option",
                                                                "value": "valitse",
                                                                "thisText": "Valitse"
                                                            },
                                                            {
                                                                "type": "option",
                                                                "value": "Peruskoulu",
                                                                "text": "Peruskoulu"
                                                            },
                                                            {
                                                                "type": "option",
                                                                "value": "Lukio tai ammattikoulu",
                                                                "text": "Lukio tai ammattikoulu"
                                                            },
                                                            {
                                                                "type": "option",
                                                                "value": "Korkeakoulu",
                                                                "text": "Korkeakoulu"
                                                            }
                                                        ]

                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "tr",
                                        "id":"continueButton",
                                        "elements":[
                                            {
                                                "type": "td",
                                                "id": "buttonContinue",
                                                "elements":[
                                                    {
                                                        "type":"input",
                                                        "id": "buttonId",
                                                        "inputType": "button",
                                                        "value": "Jatka",
                                                        "onclick": "stateMachine.createUser()"
                                                    }
                                                ]
                                            }
                                        ]
                                    }

                                ]

                            }
                        ]
                    }
                ]
            }
        ]);

    }

    function getSelectListValue(listId){
        return document.getElementById(listId).options[document.getElementById(listId).selectedIndex].value;
    }
    
    function signUp(){

        try {

            var yearOfBirth = getSelectListValue("yearofbirth");
            var education = getSelectListValue("education");

            if(yearOfBirth  === "valitse"){
                return false;
            }else if(education === "valitse"){
                return false;
            }

            var params = new Params();

            params.add("username", user.name());
            params.add("sex", document.querySelector('input[name="sex"]:checked').value);
            params.add("yearOfBirth", yearOfBirth);
            params.add("handedness", document.querySelector('input[name="handedness"]:checked').value);
            params.add("education", document.getElementById("education").value);
            
            var request = new Request();
            var responseText = request.createPost(settings.url + "signup", params.toString());

            state.change(3);

        }catch(err) {

        }

    }
    

    return {
        start:start,
        signup:signUp
    };
    
    
}
