
function showList(evStore, numberList, timeBetweenTwoNumbers, timeNumberInScreen, timeForGuessing) {
    var i = 0;
    function showNext(){
        if(i<numberList.length) {
            var s = new showNumberSeries(evStore, numberList[i], timeBetweenTwoNumbers, timeNumberInScreen, timeForGuessing);
            s.start();
            i++;
        }
    }

    return{
        showNext: showNext
    }
}

function showNumberSeries(evStore, numberSeries, timeBetweenTwoNumbers, timeNumberInScreen, timeForGuessing) {
    var i = 0;
    var numbers = numberSeries.numbers;
    var order = numberSeries.order;

    function start(){
        evStore.registerEvent("EVENT_START_SHOWSERIES", "", Date.now());
        createHtml();
        setTimeout(timeBetweenNumbers, timeBetweenTwoNumbers);
        evStore.registerEvent("EVENT_END_SHOWSERIES", "", Date.now());
    }

    function createHtml(){
        document.body.innerHTML = "<div id=\"Game\">\
        <ul>\
        <h1 id = \"num_field\"></h1>\
        </ul>\
        </div>\
        ";
    }

    function showNumber() {
        if(i<numbers.length) {
            $("#num_field").hide();
            evStore.registerEvent("EVENT_END_NUMBER", numbers[i], Date.now());
            i++;
            setTimeout(timeBetweenNumbers,timeBetweenTwoNumbers);
        }
        else {
            $("#num_field").hide();
            evStore.registerEvent("EVENT_END_TYPING", order, Date.now());
            show.showNext();
        }
    }

    function timeBetweenNumbers() {
        if(i<numbers.length) {
            $("#num_field").show();
            $("#num_field").html(numbers[i]);
            evStore.registerEvent("EVENT_START_NUMBER", numbers[i], Date.now());
            setTimeout(showNumber,timeNumberInScreen);
        }
        else if(i==numbers.length) {
            $("#num_field").show();
            $("#num_field").html(order);
            evStore.registerEvent("EVENT_START_TYPING", order, Date.now());
            setTimeout(showNumber, timeForGuessing);
        }
    }

    return {
        start: start
    }
}