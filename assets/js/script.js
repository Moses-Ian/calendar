//variable declarations
//================================================
var currentDay = $("#currentDay");
var timeContainer = $("#time-container");
var taskContent;

var tasks = [];



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

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
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

//build the time blocks
for(let i=9; i<=17; i++) {
	var taskText = "default";
	
	var rowEl = $("<div>").addClass("time-block row border border-primary rounded").attr("order",i-9);
	var timeEl = $("<div>").addClass("time-container col-1 border-right border-dark");	//I don't think this is quite how I want to do this
		//-> I want to save the time as a variable I can compare to later
	var pEl = $("<p>").addClass("time-content").text(moment().set("hour", i).format("h a"));
	var taskEl = $("<div>").addClass("task-container col-10");
	var ppEl = $("<p>").addClass("task-content").text(taskText);
	var saveBtn = $("<button>").addClass("save-button col-1 bg-info");
	var icon = $("<i>").addClass("fas fa-save fa-2x");
	
	timeEl.append(pEl);
	taskEl.append(ppEl);
	saveBtn.append(icon);
	rowEl.append(timeEl, taskEl, saveBtn);
	timeContainer.append(rowEl);
	
	tasks.push(taskText);
	
}

update();







