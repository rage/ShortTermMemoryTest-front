
describe("Notification", function() {




    it("test", function() {
        document.body.innerHTML = "";
        var wps = new Notification();
        wps.keyPress(13);

        expect(document.body.innerHTML).toBe("");


    });


});
