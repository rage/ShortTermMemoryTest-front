function User(){
    var name;
    var trained;

    function set(newName){
        name = newName;
    }

    function name(){
        return name;
    }

    function isTrained(){
        return trained;
    }

    function setTrained(is){
        trained = is;
    }

    return {
        set:set,
        name:name,
        setTrained:setTrained,
        isTrained:isTrained
    }
}