function GetList(){ 
    
    function getNextList(){
        
        var url = "http://shorttermmemorytest.herokuapp.com/lists/1.json";
        var params = "username="+username
        
        var req = new CreateRequest();  
        var jsonData = req.createGet(url, params);
        
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
