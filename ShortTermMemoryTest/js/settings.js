var show;
var username;
var userIsTrained;
var url = "http://shorttermmemorytest.herokuapp.com/";
//var url = "http://localhost:3000/"
var testcase_id;
var debug = false;

var konsoli = function (){
    function log(logi){
        if(debug){
            console.log(logi);
        }
    }

    return {
        log:log
    }

}();