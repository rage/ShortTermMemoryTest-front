function GetList(){

    function getNextList(){

        var req = new Request();
        var params = "username="+username;
        var urlEnd = "nextList";
        var jsonData = req.createPost(url+urlEnd, params);

        var jsonParsed = JSON.parse(jsonData);
        var numberSets = jsonParsed["list"]["numbersets"];
        testcase_id = jsonParsed["id"];

        return createNumberList(numberSets);

    }


    function getTrainingList(){

        var req = new Request();
        var params = "username="+username;
        var urlEnd = "trainingList";
        var jsonData = req.createPost(url+urlEnd, params);

        var jsonParsed = JSON.parse(jsonData);
        var numberSets = jsonParsed["list"]["numbersets"];

        testcase_id = jsonParsed["id"];

        return createNumberList(numberSets);

    }

    function createNumberList(list) {
        
        var numberList = [ ];

        for(var i=0; i<list.length; i++) {
            
            var numberSeries = [];
            var numbers = [];
            
            for (var x = 0; x < list[i]["numbers"].length; x++) {
                numbers[x] = list[i]["numbers"][x]["text"];
            }
            
            numberSeries.order = list[i]["order"];
            numberSeries.numbers = numbers;
            numberList[i]=numberSeries;
            
        }

        return numberList;
        
    }
    
    return {
        getNextList:getNextList,
        getTrainingList:getTrainingList
    }

}
