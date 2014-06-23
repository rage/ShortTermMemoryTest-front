function Params(){
    var params = new Array();

    function add(param, value){
        params.push(param+"="+value);
    }

    function toString(){
        return params.join("&")
    }

    return {
        add:add,
        toString:toString
    };
}