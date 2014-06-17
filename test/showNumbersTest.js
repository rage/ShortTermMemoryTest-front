
/**
 * Created by artokaik on 23.5.2014.
 */

describe("showNumbersTest", function() {



    it("ShowNumber puts number in #num_field", function() {
        ShowNumber("1");
        expect($("#num_field").text()).toBe("1");
    });

    it("After ShowNumber puts 2 numbers in #num_field only the latter is visible", function() {
        ShowNumber("1");
        ShowNumber("2");
        expect($("#num_field").text()).toBe("2");
    });

    it("hideNumber hides the text in #num_field", function() {
        ShowNumber("1");
        hideNumber();
        expect($("#num_field").text()).hidden;
    });

    it("When ShowNumber is called after hideNumber the number is visible in the #num_field", function() {
        ShowNumber("1");
        hideNumber();
        ShowNumber("1");
        expect($("#num_field").text()).not.hidden;
    });

    it("also shows the + sign instead of a number", function() {
        ShowNumber("+");
        expect($("#num_field").text()).toBe("+");
        expect($("#num_field").text()).not.hidden;
        hideNumber();
        expect($("#num_field").text()).hidden;
    });

});