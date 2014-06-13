function GetList(user){

    function getNextList(){
        return getList("nextList");
    }


    function getTrainingList(){
        return getList("trainingList");
    }

    function getList(listType){

        var req = new Request();
        var params = "username="+user.name();
        var jsonData = req.createPost(url+listType, params);

        var jsonParsed = JSON.parse(jsonData);
        var numberSets = jsonParsed["list"]["numbersets"];
        testcase_id = jsonParsed["id"];

        return createNumberList(numberSets);

    }

    function createNumberList(list) {
        
        var numberList = [ ];

        for(var i = 0; i < list.length; i++) {
            
            var numberSeries = [];
            var numbers = [];
            
            for (var x = 0; x < list[i]["numbers"].length; x++) {
                numbers[x] = list[i]["numbers"][x]["text"];
            }
            
            numberSeries.order = list[i]["order"];
            numberSeries.numbers = numbers;
            numberList[i] = numberSeries;
            
        }

        return numberList;
        
    }
    
    return {
        getNextList:getNextList,
        getTrainingList:getTrainingList
    }

}
