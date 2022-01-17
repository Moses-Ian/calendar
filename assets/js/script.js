//variable declarations
//================================================
var currentDay = $("#currentDay");
var timeContainer = $("#time-container");

var tasks = [];



//function declarations
//================================================
function update() {
	//display current day
	currentDay.text(moment().format("dddd, MMMM Do"));
	var taskContent = $(".time-block");
	
	//update styling based on time
	taskContent.each(function() {
		//prepare the variables
		var task = $(this).find(".task-container");
		var timeContent = $(this).find(".time-content");
		var time = moment(timeContent.text().trim(), "h a");
		var minutesSinceTimeBlock = moment().diff(time, "minutes");
		// var minutesSinceTimeBlock = moment().set("hour", 12).diff(time, "minutes");		//use to check style

		//remove old style
		task.removeClass("bg-primary bg-secondary bg-success");
		
		//add new style
		if (minutesSinceTimeBlock >= 60) {
			task.addClass("past");
		} else if(minutesSinceTimeBlock >= 0) {
			task.addClass("present");
		} else {
			task.addClass("future");
		}
	});
	
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks"));
	if (!tasks) {
		tasks = [];
		for(let i=0; i<=8; i++) {
			tasks.push("no task scheduled");
		}
	}
}


//attach listeners
//================================================
//let the user change the task content
$("#time-container").on("click", ".task-content", function () {
	// console.log("click");
	var text = $(this)
    .text()
    .trim();
	var textInput = $("<textarea>")	//create new
		.addClass("form-control")
		.val(text);
	$(this).replaceWith(textInput);
	textInput.trigger("focus");
});

//swhen the user clicks away, change back to <p>
$("#time-container").on("blur", "textarea", function () {
	// console.log("blur");

	// get the textarea's current value/text
	var text = $(this)
		.val()
		.trim();
	
	//swap the textarea with a pEl
	var pEl = $("<p>").addClass("task-content").text(text);
	$(this).replaceWith(pEl);
});

//save the data 
$("#time-container").on("click", "button", function () {
	var timeBlock = $(this).closest(".time-block");
	var text = timeBlock.find(".task-content").text().trim();
	var index = timeBlock.attr("order");
	tasks[index] = text;
	saveTasks();
});


//main code
//================================================

loadTasks();

//build the time blocks
for(let i=9; i<=17; i++) {
	
	var taskText = tasks[i-9];

	var rowEl = $("<div>").addClass("time-block row border border-2 border-primary rounded-3").attr("order",i-9);
	var timeEl = $("<div>").addClass("time-container col-2 col-sm-2 col-md-2 col-lg-1 border-right border-dark text-center");	//I don't think this is quite how I want to do this
		//-> I want to save the time as a variable I can compare to later
	var pEl = $("<p>").addClass("time-content").text(moment().set("hour", i).format("h a"));
	var taskEl = $("<div>").addClass("task-container col-8 col-sm-9 col-md-9 col-lg-10");
	var ppEl = $("<p>").addClass("task-content").text(taskText);
	var saveBtn = $("<button>").addClass("save-button col-2 col-sm-1 col-md-1 col-lg-1 bg-info");
	var icon = $("<i>").addClass("fas fa-save fa-2x");
	
	timeEl.append(pEl);
	taskEl.append(ppEl);
	saveBtn.append(icon);
	rowEl.append(timeEl, taskEl, saveBtn);
	timeContainer.append(rowEl);
	
	tasks.push(taskText);
	
}

update();

//get the time until the next hour
var now = moment();
var nextHour = now.clone().minute(0).second(0).add(1, "hours");
var timeLeft = nextHour.diff(now);
//set a timeout to trigger on the next hour
setTimeout(
	function() {
		//once the flat hour is hit, update...
		update();
		//and set a new interval to update every hour
		setInterval(update, 3600000);	//60 minutes
	}, 
	timeLeft
);




































