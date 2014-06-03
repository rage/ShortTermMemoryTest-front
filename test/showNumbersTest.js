
/**
 * Created by artokaik on 23.5.2014.
 */

describe("showNumbersTest", function() {



    it("showNumber puts number in #num_field", function() {
        showNumber("1");
        expect($("#num_field").text()).toBe("1");
    });

    it("After showNumber puts 2 numbers in #num_field only the latter is visible", function() {
        showNumber("1");
        showNumber("2");
        expect($("#num_field").text()).toBe("2");
    });

    it("hideNumber hides the text in #num_field", function() {
        showNumber("1");
        hideNumber();
        expect($("#num_field").text()).hidden;
    });

    it("When showNumber is called after hideNumber the number is visible in the #num_field", function() {
        showNumber("1");
        hideNumber();
        showNumber("1");
        expect($("#num_field").text()).not.hidden;
    });
});