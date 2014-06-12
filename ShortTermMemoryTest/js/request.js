function Request(){
    
    function createPost(url, params){
        return create(url, params, "POST");
    }
    
    function create(url, params, type){
        
        var req = createCORSRequest(type, url);
        
        if(type == "POST"){
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }

        req.send(params);
        return req.responseText;
        
    }
    
    function createCORSRequest(method, url) {
        
        var req = new XMLHttpRequest();
        
        if ("withCredentials" in req) {
            req.open(method, url, false);
        } else if (typeof XDomainRequest != "undefined") {
            req = new XDomainRequest();
            req.open(method, url);
        } else {
            req = null;
        }

        return req;

    }
    
    return {
        createPost:createPost
    }
}
