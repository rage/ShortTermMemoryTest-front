function User(){
    var username;
    var trained;
    var testCaseId;

    function set(newName){
        username = newName;
    }

    function name(){
        return username;
    }

    function isTrained(){
        return trained;
    }

    function setTrained(is){
        trained = is;
    }

    function testCase(){
        return testCaseId;
    }
    function setTestCase(caseId){
        testCaseId = caseId;
    }

    return {
        set:set,
        name:name,
        setTrained:setTrained,
        isTrained:isTrained,
        testCase:testCase,
        setTestCase:setTestCase
    };
}