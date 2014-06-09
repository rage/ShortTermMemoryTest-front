
describe("As a new User, I want to see instructions", function() {
  
    beforeEach(function() {  
        jasmine.clock().install();    
        jasmine.clock().tick(200);
    });
    
    function simulateKeyPress(c) {
        console.log(c);
        jQuery.event.trigger({ type : 'keypress', which : c });
    }

    
    it("instructions", function(done) {
 
        stateMachine.start();


        document.getElementById('username').value = "Omena";
        stateMachine.checkUsername("Omena") 
		done();

    });
    it("instructions2", function(done) {
        expect(document.getElementById("Notification").innerHTML).toBe(text["testinTarkoitus"]);

        simulateKeyPress(32);
        done();

    });
    it("instructions3", function(done) {
        expect(document.getElementById("startScreen").innerHTML).toBe(text["ohje"]);

        simulateKeyPress(32);
        done();

    });

    it("instructions4", function(done) {
        expect(document.getElementById("PracticeStart").innerHTML).toBe(text["harjoittelunAloitushje"]);
        done();

    });

    it("instructions5", function(done) {

        //simulateKeyPress(32); 
        done();

    });
 


});
