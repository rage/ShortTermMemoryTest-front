
describe("WaitPractiseStart", function() {




    it("test", function() {
        document.body.innerHTML = "";
        var stateMock = function() {

            function change(){

            }

            return {
                change:change
            }
        }();
        var wps = new WaitPractiseStart(stateMock);
        wps.keyPress(13);

        expect(document.body.innerHTML).toBe("");


    });


});
