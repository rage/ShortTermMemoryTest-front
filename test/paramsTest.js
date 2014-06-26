
describe("paramsTest", function() {




    it("test", function() {
        var p = new Params();
        p.add("lorem", "ipsum");
        p.add("true", "false");
        expect(p.toString()).toBe("lorem=ipsum&true=false");


    });


});
