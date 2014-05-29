function GetList(list_id){
    var req = new CreateRequest(); 
    var url = "http://shorttermmemorytest.herokuapp.com/lists/"+list_id+".json";
    var jsonData = req.createGet(url);
    console.log("dataa") 
    console.log(jsonData)
    console.log(JSON.parse(jsonData))
    return createNumberList(JSON.parse(jsonData));

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
            console.log(numbers);
            numberList[i]=numberSeries;


        }
        return numberList;
    }

}
