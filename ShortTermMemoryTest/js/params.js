function Params(){
    var params = [];

    function add(param, value){
        params.push(param+"="+value);
    }

    function toString(){
        return params.join("&");
    }

    return {
        add:add,
        toString:toString
    };
}