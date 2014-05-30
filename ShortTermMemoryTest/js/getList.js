function GetList(){ 
    
    function getNextList(){

        var req = new CreateRequest();
        params = "username="+username
        var urlEnd = "lists/1.json"
        var jsonData = req.createGet(url+urlEnd, params);

        return createNumberList(JSON.parse(jsonData));
        
    }

    function createNumberList(list) {
        
        var numberList = [ ];

        for(var i=0; i<list.length; i++) {
            
            var numberSeries = [];
            var numbers = [];
            
            for (var x = 0; x < list[i]["numbers"].length; x++) {
                var number = x;
                numbers[x] = list[i]["numbers"][x]["text"];
            }
            
            numberSeries.order = list[i]["order"];
            numberSeries.numbers = numbers;
            numberList[i]=numberSeries;
            
        }
        
        return numberList;
        
    }
    
    return {
        getNextList:getNextList
    }

}
