
/**
 * Created by artokaik on 23.5.2014.
 */

describe("showNumbersTest", function() {



    it("Numbers puts number in #num_field", function() {
        var num = new Numbers();
        num.show("1");
        expect($("#num_field").text()).toBe("1");
    });

    it("After Numbers puts 2 numbers in #num_field only the latter is visible", function() {
        var num = new Numbers();
        num.show("1");
        num.show("2");
        expect($("#num_field").text()).toBe("2");
    });

    it("hideNumber hides the text in #num_field", function() {
        var num = new Numbers();
        num.show("1");
        num.hide();
        expect($("#num_field").text()).hidden;
    });

    it("When Numbers is called after hideNumber the number is visible in the #num_field", function() {
        var num = new Numbers();
        num.show("1");
        num.hide();
        num.show("1");
        expect($("#num_field").text()).not.hidden;
    });

    it("also shows the + sign instead of a number", function() {
        var num = new Numbers();
        num.show("+");
        expect($("#num_field").text()).toBe("+");
        expect($("#num_field").text()).not.hidden;
        num.hide();
        expect($("#num_field").text()).hidden;
    });

});