function GUI(){
    
    function createNew(guiData){
        resetBody();
        createHTML(guiData, "body", "element");
    }
    
    function createHTML(data, addUnder, type){

        var newDiv = document.createElement(data[0]["type"]);
        newDiv.id = data[0]["id"];
        if(data[0]["text"]) {
            newDiv.innerHTML = data[0]["text"];
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
