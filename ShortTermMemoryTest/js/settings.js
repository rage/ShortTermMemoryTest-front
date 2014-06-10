var url = "http://shorttermmemorytest.herokuapp.com/";
//var url = "http://localhost:3000/"
var maxFails = 1; //Number of failed series allowed before the series of that length are dropped out
var failLimit = 2; //Correct numbers required in a series for series not to be considered a major fail
var droppedSeriesMinLength = 6;