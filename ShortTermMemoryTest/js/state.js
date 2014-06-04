function State(){
    var state = 0;
    var allowedStateChanges = [
        [0, 1],
        [1, 2],
        [1, 3],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 6]
    ];

    function is(stateIs){
        return stateIs == state;
    }

    function set(newState){

        if(isAllowedStateChange(newState)){
            state = newState;
            return true
        }

        return false

    }

    function isAllowedStateChange(newState){

        for(var i=0; i<allowedStateChanges.length; i++) {

            if (allowedStateChanges[i][0] == state){

                if (allowedStateChanges[i][1] == newState){
                    return true
                }

            }

        }

        return false

    }

    return {
        set:set,
        is:is
    }
}