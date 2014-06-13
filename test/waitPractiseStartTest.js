
describe("WaitPractiseStart", function() {




    it("test", function() {
        document.body.innerHTML = "";
        var wps = new WaitPractiseStart();
        wps.keyPress(13);

        expect(document.body.innerHTML).toBe("");


    });


});
