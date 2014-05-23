///**
// * Created by artokaik on 23.5.2014.
// */
//
//describe("showNumbers", function() {
//    var storer;
//    var shower
//    var numberList = [];
//    var series0 = [0,1,2];
//    var series1 = [3,1,2,5];
//    var series2 = [9,4,3,6,8];
//    var numberSeries0 = [];
//    numberSeries0.numbers= series0;
//    numberSeries0.order = "backwards";
//
//    var numberSeries1 = [];
//    numberSeries1.numbers= series1;
//    numberSeries1.order = "upwards";
//
//    var numberSeries2 = [];
//    numberSeries2.numbers= series2;
//    numberSeries2.order = "upwards";
//
//    numberList[0]=numberSeries0;
//    numberList[1]=numberSeries1;
//    numberList[2]=numberSeries2;
//
//
//    beforeEach(function() {
//        storer = new eventStorer();
//        shower = new showList(storer, numberList,1000,500,10000);
//    });
//
//
//
//    it("first number in screen ", function() {
//        shower.showNext();
//        setTimeout(expect($("h1").text()).toBe(0),1500);
//    });
//
//});