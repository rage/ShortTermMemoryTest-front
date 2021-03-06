var url = "http://shorttermmemorytest.herokuapp.com/";


describe("createPostRequest (signup)", function() {

    it("return true when user not found ", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length)); 
        var params = 'username='+text+'&sex=f&yearOfBirth=1966&handedness=r&education=Peruskoulu';
        var request = Request();
        var responseText = request.createPost(url+"signup", params);

        
        expect(responseText).toBe("true");

    });
    it("return false when user found ", function() {


        var params = 'username=Olen&sex=f&yearOfBirth=1966&handedness=r&education=Peruskoulu';
        var request = Request();
        var responseText = request.createPost(url+"signup", params);

        
        expect(responseText).toBe("false");

    });
    

    it("return false when yearOfBirth unvalid ", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            
        var params = 'username='+text+'&sex=f&yearOfBirth=1800&handedness=r&education=Peruskoulu';
        var request = Request();
        var responseText = request.createPost(url+"signup", params);

        
        expect(responseText).toBe("false");

    });

    it("return false when yearOfBirth unvalid ", function() {
        var text = "";
        var year = new Date().getFullYear();
        year += 1;
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            
        var params = 'username='+text+'&sex=f&yearOfBirth='+year+'&handedness=r&education=Peruskoulu';
        var request = Request();
        var responseText = request.createPost(url+"signup", params);

        
        expect(responseText).toBe("false");

    });
    
    it("return true when yearOfBirth valid ", function() {
        var text = "";
        var year = new Date().getFullYear();
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            
        var params = 'username='+text+'&sex=f&yearOfBirth='+year+'&handedness=r&education=Peruskoulu';
        var request = Request();
        var responseText = request.createPost(url+"signup", params);

        
        expect(responseText).toBe("true");

    });
    
    it("return true when yearOfBirth valid ", function() {
        var text = "";
        var year = new Date().getFullYear();
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            
        var params = 'username='+text+'&sex=f&yearOfBirth='+year+'&handedness=r&education=Peruskoulu';
        var request = Request();
        var responseText = request.createPost(url+"signup", params);

        
        expect(responseText).toBe("true");

    });


});
 

describe("createPostRequest (login)", function() {

    it("return false when user not found ", function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            
        var params = 'username='+text;
        var request = Request();
        var responseText = request.createPost(url+"login", params);

        
        expect(responseText).toContain("isReserved\":false");

    });
    it("return true when user found ", function() {


        var params = 'username=Olen';
        var request = Request();
        var responseText = request.createPost(url+"login", params);

        
        expect(responseText).toContain("isReserved\":true");

    });


});
