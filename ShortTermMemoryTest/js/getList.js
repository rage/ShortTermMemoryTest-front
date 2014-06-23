function GetList(user, settings){

    function getNextList(){
        return getList("nextList");
    }


    function getTrainingList(){
        return getList("trainingList");
    }

    function getList(listType){

        var req = new Request();
        var params = new Params();
        params.add("username", user.name());
        params.add("testpath", settings.frontId);

        var jsonData = req.createPost(settings.url + listType, params.toString());

        var jsonParsed = JSON.parse(jsonData);
        var numberSets = jsonParsed["list"]["numbersets"];
        user.setTestCase(jsonParsed["id"]);

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
