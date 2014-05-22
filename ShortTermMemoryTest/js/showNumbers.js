
var ShowNumbers = (function() {

    function createHtml(){
        document.body.innerHTML = "<div id=\"Game\">\
        <ul>\
        <h1></h1>\
        </ul>\
        </div>\
        ";
    }

    console.log("Starting to show numbers");
    var listOfNumbers = ["7","6","5","4","3"];
    var index = 0;

    function startShowing() {
        createHtml();
        showNumber();
        function showNumber() {
            //console.log("hiiii "+index)
            $("h1").hide();
            setTimeout(timeBetweenNumbers,500);
        }
        function timeBetweenNumbers() {
            if(index<listOfNumbers.length) {
                $("h1").show();
                $("h1").html(listOfNumbers[index]);
                index++;
                setTimeout(showNumber,1000);
                //console.log("h0000 "+index)
            }
        }
    }
    return {
        startShowing: startShowing
    }
});