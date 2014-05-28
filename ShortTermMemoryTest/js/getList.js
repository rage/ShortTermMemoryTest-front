function GetList(list_id){
    var req = new CreateRequest(); 
    var url = "http://shorttermmemorytest.herokuapp.com/lists/"+list_id+".json";
    var jsonData = req.createGet(url , "");
    return jsonData;
}
