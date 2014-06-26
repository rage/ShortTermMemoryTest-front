describe("ShowPracticeFeedbackTest", function() {


    beforeEach(function() {

        jasmine.clock().install();
    });


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

            function getMode(){
                return "PRACTICE";
            }

            return {
                result:result,
                requestFocus:requestFocus,
                getMode:getMode
            }
        }();
        var a = new Result(gameDataMock);
        a.show();

        expect(document.getElementById("secondline").innerHTML).toBe(text["oikeinIlmoitus"]);

        expect(document.getElementById("thirdline").innerHTML).toBe(text["seuraava"]);

    });


});

describe("ShowPracticeFeedbackEndTest", function() {


    it("PracticeFeedbackEnd", function() {
        var gameDataMock = function() {
            var maxPracticeRounds = 3;

            var result =  function() {
                var lastSeriesCorrectness = true;
                return {
                    lastSeriesCorrectness:lastSeriesCorrectness
                }
            }();

            function requestFocus(){
                return true;
            }

            function getdonePracticeRounds(){
                return 3;
            }

            return {
                result:result,
                requestFocus:requestFocus,
                getdonePracticeRounds:getdonePracticeRounds,
                maxPracticeRounds:maxPracticeRounds
            }
        }();
        var a = new PracticeFeedbackEnd(gameDataMock);
        a.show();
        expect(document.getElementById("ResultEnd").innerHTML).toContain(text["oikeinIlmoitus"]);


    });

});


//    if (gameData.getdonePracticeRounds() < gameData.maxPracticeRounds) {
