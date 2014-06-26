function State(kList){
    var state = 0;
    var allowedStateChanges = [
        [0, 1],
        [1, 2],
        [1, 4],
        [2, 4],
        [4, 5],
        [4, 6],
        [4, 7],
        [5, 6],
        [6, 6],
        [6, 1],
        [7, 1]
    ];

    var states = [];

    function is(stateIs){
        return stateIs === state;
    }

    function set(newState){

        kList.set(null);

        if(isAllowedStateChange(newState)){
            state = newState;
            return true;
        }

        return false;

    }

    function isAllowedStateChange(newState){

        for(var i = 0; i < allowedStateChanges.length; i++) {

            if (allowedStateChanges[i][0] === state){

                if (allowedStateChanges[i][1] === newState){
                    return true;
                }

            }

        }

        return false;

    }

    function change(stateId){

        if(isAllowedStateChange(stateId)){

            for(var i = 0; i < states.length; i++) {

                if(states[i][0] === stateId){
                    set(stateId);
                    states[i][1]();
                }

            }
        }

    }

    function addStateFunction(stateId, stateFunction){
        states.push([stateId, stateFunction]);
    }

    return {
        set:set,
        is:is,
        addStateFunction:addStateFunction,
        change:change
    };
}