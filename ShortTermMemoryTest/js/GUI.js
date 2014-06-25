function GUI(){
    
    function createNew(guiData){
        resetBody();
        createHTML(guiData, "body", "element");
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
        if(data[0]["value"]) {
            newDiv.value = data[0]["value"];
        }
        if(data[0]["inputType"]) {
            newDiv.type = data[0]["inputType"];
        }
        if(data[0]["onclick"]) {
            newDiv.setAttribute("onClick", data[0]["onclick"]);
        }
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
    
    function resetBody(){
        document.body.innerHTML = ""; 
    }
    
    return {
        createNew:createNew
    };
}
