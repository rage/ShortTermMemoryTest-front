function GUI(){
    
    function createNew(guiJson){ 
        resetBody();
        createHTML(guiJson, "body")
        
    }
    
    function createHTML(data, addUnder){

        var newDiv = document.createElement(data[0]["type"]);
        newDiv.id = data[0]["id"];
        newDiv.innerHTML = data[0]["text"]; 
        document.getElementsByTagName(addUnder)[0].appendChild(newDiv);
        /*
        data[0].remove
        if(data.length > 1){
            createHTML(data[]);
        }
        */

        
    }
    
    function resetBody(){
        document.body.innerHTML = ""; 
    }
    
    return {
        createNew:createNew
    }
}
