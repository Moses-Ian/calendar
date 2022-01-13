//variable declarations
//================================================
var currentDay = $("#currentDay");
var timeContainer = $("#time-container");
var taskContent;



//function declarations
//================================================
function update() {
	//display current day
	currentDay.text(moment().format("dddd, MMMM Do"));
	taskContent = $(".time-block");
	taskContent.each(function() {
		var task = $(this).find(".task-container");
		var timeContent = $(this).find(".time-content");
		task.removeClass("bg-primary bg-secondary bg-success");
		
		var time = moment(timeContent.text().trim(), "h a");
		
		var minutesSinceTimeBlock = moment().diff(time, "minutes");
		
		if (minutesSinceTimeBlock >= 60) {
			task.addClass("bg-secondary");
		} else if(minutesSinceTimeBlock >= 0) {
			task.addClass("bg-primary");
		} else {
			task.addClass("bg-success");
		}
		
		
	});
}






//attach listeners
//================================================







//main code
//================================================

//build the time blocks
for(let i=9; i<=17; i++) {
	var rowEl = $("<div>").addClass("time-block row border border-primary rounded");
	var timeEl = $("<div>").addClass("time-container col-2 border-right border-dark");	//I don't think this is quite how I want to do this
		//-> I want to save the time as a variable I can compare to later
	var pEl = $("<p>").addClass("time-content").text(moment().set("hour", i).format("h a"));
	var taskEl = $("<div>").addClass("task-container col-10");
	var ppEl = $("<p>").addClass("task-content").text("default");
	
	timeEl.append(pEl);
	taskEl.append(ppEl);
	rowEl.append(timeEl, taskEl);
	timeContainer.append(rowEl);
	
}

update();







