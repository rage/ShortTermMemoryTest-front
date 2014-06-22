function Request(){
    
    function createPost(url, params){
        return create(url, params, "POST");
    }
    
    function create(url, params, type){
        
        var resultData;
        
        $.ajax({
            type: type,
            url: url,
            data: params,
            success: function(result) { 
               resultData = result;
            },
            dataType: 'text',
            async:false
        }); 
        
        return resultData;
        
    }
    
    return {
        createPost:createPost
    };
    
}
