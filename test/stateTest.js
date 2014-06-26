
describe("stateTest", function() {




    it("test", function() {
        var kList = new KeyListener();
        var a = State(kList);
        a.set(1);
        expect(a.set(5)).toBe(false);


    });
    it("test change", function() {
        var kList = new KeyListener();
        var a = State(kList);
        a.addStateFunction(1, function(){
            console.log("fail");
        });
        a.addStateFunction(5, function(){
            console.log("fail");
        });
        a.set(1);
        a.change(5);
        expect(a.is(1)).toBe(true);


    });


});
