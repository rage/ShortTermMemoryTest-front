function CreateTestUser(params){
    var username = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
    for( var i=0; i < 25; i++ )
        username += possible.charAt(Math.floor(Math.random() * possible.length)); 
    
    if(params == undefined){
        var params = 'username='+username+'&sex=f&yearOfBirth=1966&handedness=r&education=Peruskoulu';
    }
    
    var request = CreateRequest();
    var responseText = request.createPost(url+"signup", params);
    
    return username
    
}
    
