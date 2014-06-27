
describe("stateMachineTest", function() {

    it("start()", function() {

        stateMachine.start();

        expect(document.body.innerHTML).toContain(text["kirjoitaTunnus"]);

    });

    it("start() => ", function() {

        stateMachine.start();

        expect(document.body.innerHTML).toContain(text["kirjoitaTunnus"]);

    });



});