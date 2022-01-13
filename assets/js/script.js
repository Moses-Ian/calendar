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
		var task = $(this).children(".task-content");
		var timeContent = $(this).children(".time-content");
		task.removeClass("bg-primary bg-secondary bg-success");
		
		//just to test
		// if (time.text() === "3pm"){
			// task.addClass("bg-primary");
		// } else {
			// task.addClass("bg-secondary");
		// }
		
		var time = moment(timeContent.text().trim(), "h a");
		// console.log(a.format("dddd, MMMM Do YYYY @ hh:mm a"));
		
		var minutesSinceTimeBlock = moment().diff(time, "minutes");
		console.log(minutesSinceTimeBlock);
		
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
for(let i=10; i<=17; i++) {
	var rowEl = $("<div>").addClass("time-block row border border-primary rounded");
	var timeEl = $("<div>").addClass("time-content col-2 border-right border-dark").text(moment().set("hour", i).format("h a"));	//I don't think this is quite how I want to do this
		//-> I want to save the time as a variable I can compare to later
	var taskEl = $("<div>").addClass("task-content col-10").text("default");
	
	rowEl.append(timeEl, taskEl);
	timeContainer.append(rowEl);
	
}

update();







