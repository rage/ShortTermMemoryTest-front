

function createPostRequest(){
    
    function create(url, params){
        
        console.log(url);
        
        console.log(params);
        
        var req = createCORSRequest("POST", url);
        console.log(req);
        
        req.onload = function() {
            };
        console.log(req.response);
        req.onerror = function() {
            console.log('Kysely ei onnistunut');
        };  
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.setRequestHeader("Content-length", params.length);
        req.send(params);
        
        console.log(req.responseText); 
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
        create:create
    }
}
