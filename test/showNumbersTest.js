/**
 * Created by artokaik on 23.5.2014.
 */

describe("showNumbers", function() {
    var storer;
    var shower
    var numberList = [];
    var series0 = [0,1,2];
    var series1 = [3,1,2,5];
    var series2 = [9,4,3,6,8];
    var numberSeries0 = [];
    numberSeries0.order = "backwards";
    numberSeries0.numbers= series0;

    var numberSeries1 = [];
    numberSeries1.order = "upwards";
    numberSeries1.numbers= series1;

    var numberSeries2 = [];
    numberSeries2.order = "upwards";
    numberSeries2.numbers= series2;

    numberList[0]=numberSeries0;
    numberList[1]=numberSeries1;
    numberList[2]=numberSeries2;

    beforeEach(function() {
        storer = new eventStorer();
        show = new showList(storer, numberList ,1000,500,10000);
    });

    it("first set of numbers in screen ", function() {
        jasmine.Clock.useMock();
        show.showNext();
        jasmine.Clock.tick(1100);
        expect($("#num_field").text()).toBe("0");
        jasmine.Clock.tick(500);
        expect($("#num_field").text()).hidden;
    });

    it("first number in screen ", function() {
        jasmine.Clock.useMock();
        show.showNext();
        jasmine.Clock.tick(5600);
        expect($("#num_field").text()).toBe("backwards");
    });

    it("first set of numbers in screen ", function() {
        jasmine.Clock.useMock();
        show.showNext();
        jasmine.Clock.tick(1100);
        expect($("#num_field").text()).toBe("0");
        jasmine.Clock.tick(1500);
        expect($("#num_field").text()).toBe("1");
        jasmine.Clock.tick(1500);
        expect($("#num_field").text()).toBe("2");
        jasmine.Clock.tick(1500);
        expect($("#num_field").text()).toBe("backwards");
    });

    it("two sets of numbers in screen ", function() {
        jasmine.Clock.useMock();
        show.showNext();
        jasmine.Clock.tick(1100);
        expect($("#num_field").text()).toBe("0");
        jasmine.Clock.tick(1500);
        expect($("#num_field").text()).toBe("1");
        jasmine.Clock.tick(1500);
        expect($("#num_field").text()).toBe("2");
        jasmine.Clock.tick(1500);
        expect($("#num_field").text()).toBe("backwards");
        jasmine.Clock.tick(5000);
        expect($("#num_field").text()).toBe("3");
    });
});