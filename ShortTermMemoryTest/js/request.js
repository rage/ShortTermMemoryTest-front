function Request(){

    function createPostAsync(url, params){
        return create(url, params, "POST", true);
    }
    function createPost(url, params){
        return create(url, params, "POST", false);
    }
    
    function create(url, params, type, async){
        
        var resultData;
        
        $.ajax({
            type: type,
            url: url,
            data: params,
            success: function(result) { 
               resultData = result;
            },
            dataType: 'text',
            async:async
        }); 
        
        return resultData;
        
    }
    
    return {
        createPost:createPost,
        createPostAsync:createPostAsync
    };
    
}
