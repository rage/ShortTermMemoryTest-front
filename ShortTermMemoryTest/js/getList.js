function GetList(list_id){
    var req = new CreateRequest(); 
    var url = "http://shorttermmemorytest.herokuapp.com/lists/"+list_id+".json";
    var jsonData = req.createGet(url);
    console.log("dataa") 
    console.log(jsonData)
    console.log(JSON.parse(jsonData))
    return JSON.parse(jsonData);
}
