describe("ShowPracticeFeedbackTest", function() {



    it("ShowPracticeFeedback", function() {

        var gameDataMock = function() {

            var result =  function() {
                var lastSeriesCorrectness = true;
                return {
                    lastSeriesCorrectness:lastSeriesCorrectness
                }
            }();

            function requestFocus(){
                return true;
            }

            return {
                result:result,
                requestFocus:requestFocus
            }
        }();
        var a = new ShowPracticeFeedback(gameDataMock);

        expect(document.getElementById("secondline").innerHTML).toBe(text["oikeinIlmoitus"]);

        expect(document.getElementById("thirdline").innerHTML).toBe(text["seuraava"]);


    });

});