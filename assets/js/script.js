//variable declarations
//================================================
var currentDay = $("#currentDay");
var timeContainer = $("#time-container");




//function declarations
//================================================







//attach listeners
//================================================







//main code
//================================================
//display current day
//this will probably trigger on update
currentDay.text(moment().format("dddd, MMMM Do"));

//build the time blocks
for(let i=10; i<=17; i++) {
	var rowEl = $("<div>").addClass("row");
	var timeEl = $("<div>").addClass("col-2").text(moment().set("hour", i).format("h a"));	//I don't think this is quite how I want to do this
		//-> I want to save the time as a variable I can compare to later
	var taskEl = $("<div>").addClass("col-10").text("default");
	
	rowEl.append(timeEl, taskEl);
	timeContainer.append(rowEl);
	
}









