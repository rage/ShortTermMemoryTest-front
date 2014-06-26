function GUI(){
    
    function createNew(guiData){
        resetBody();
        createHTML(guiData, "body", "element");
    }

    function run(guiName){

        if("PracticeStart" === guiName){
            createNew(
                [
                    {
                        "type": "div",
                        "id": "PracticeStart",
                        "text": "harjoittelunAloitushje"
                    }
                ]
            );

        }

        if("GameStartScreenPractice" === guiName || "GameStartScreen" === guiName){

            var type;

            if("GameStartScreenPractice" === guiName){
                type = "ohjeHarjoitteluSuorittamatta";
            }else{
                type = "ohje";
            }

            createNew(
                [
                    {
                        "type": "div",
                        "id": "startScreen",
                        "elements":[
                            {
                                "type": "div",
                                "id": "startScreenP0",
                                "text": "testinTarkoitus"
                            },
                            {
                                "type": "div",
                                "id": "startScreenP1",
                                "text": type+"1"
                            },
                            {
                                "type": "div",
                                "id": "startScreenP2",
                                "text": type+"2"
                            },
                            {
                                "type": "div",
                                "id": "startScreenP3",
                                "text": type+"3"
                            }
                            ]
                    }
                ]
            );
        }

    }
    
    function createHTML(data, addUnder, type){

        var newDiv = document.createElement(data[0]["type"]);
        newDiv.id = data[0]["id"];

        if(data[0]["text"]) {
            newDiv.innerHTML = text[data[0]["text"]];
        }else if(data[0]["thisText"]) {
            newDiv.innerHTML = data[0]["thisText"];
        }
        if(data[0]["class"]) {
            newDiv.class = data[0]["class"];
        }
        if(data[0]["class"]) {
            newDiv.class = data[0]["class"];
        }
        if(data[0]["name"]) {
            newDiv.name = data[0]["name"];
        }

        elementIsInput(newDiv, data);

        if(type === "element"){
            document.getElementsByTagName(addUnder)[0].appendChild(newDiv);
        }else{
            document.getElementById(addUnder).appendChild(newDiv);
        }

        if(data[0]["elements"]){
            createHTML(data[0]["elements"], data[0]["id"], "id");
        }

        if(data.length > 1){
            createHTML(data.slice(1), addUnder, "id");
        }

    }

    function elementIsInput(newDiv, data){
        if(data[0]["autocomplete"]) {
            newDiv.autocomplete = data[0]["autocomplete"];
        }
        if(data[0]["autofocus"]) {
            newDiv.autofocus = true;
        }
        if(data[0]["valueText"]) {
            newDiv.value = text[data[0]["valueText"]];
        }
        if(data[0]["value"]) {
            newDiv.value = data[0]["value"];
        }
        if(data[0]["inputType"]) {
            newDiv.type = data[0]["inputType"];
        }
        if(data[0]["onclick"]) {
            newDiv.setAttribute("onClick", data[0]["onclick"]);
        }
        if(data[0]["onSubmit"]) {
            newDiv.setAttribute("onSubmit", data[0]["onSubmit"]);
            newDiv.setAttribute("action", "#");
        }

    }

    function updateText(elementId, updateText){
        document.getElementById(elementId).innerHTML = text[updateText];
    }

    function resetBody(){
        document.body.innerHTML = ""; 
    }
    
    return {
        createNew:createNew,
        updateText:updateText,
        run:run
    };
}
