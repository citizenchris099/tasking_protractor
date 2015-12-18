var taskInformation = function() {
};

var phraseGen = require('../pages/phraseGen.js').phraseGen;
var tasking_main_page = require('../pages/tasking_main_page.js').tasking_main_page;

var user1 = "Test User";
var user2 = "Test User2";
var days = 30;
var daysEdit = 10;
var comment = phraseGen.randomPhrase();

function taskData(addTaskSummary, addTaskDescription, addTasklocation, labelEntry, addTaskAssignee, addedDays, displayDate,
		taskDetailsSummary, taskDetailsDescription, existingCommentAuthor, existingCommentDateTime, existingCommentText,
		taskStatus, flag) {
	this.addTaskSummary = addTaskSummary;
	this.addTaskDescription = addTaskDescription;
	this.addTasklocation = addTasklocation;
	this.labelEntry = labelEntry;
	this.addTaskAssignee = addTaskAssignee;
	this.addedDays = addedDays;
	this.displayDate = displayDate;
	this.taskDetailsSummary = taskDetailsSummary;
	this.taskDetailsDescription = taskDetailsDescription;
	this.existingCommentAuthor = existingCommentAuthor;
	this.existingCommentDateTime = existingCommentDateTime;
	this.existingCommentText = existingCommentText;
	this.taskStatus = taskStatus;
	this.flag = flag;
};

taskInformation.prototype.addTaskData = function() {
	return new taskData(phraseGen.randomPhrase(), phraseGen.randomPhrase(), phraseGen.randomLocation(), [
			phraseGen.randomLabel(), phraseGen.randomLabel(), phraseGen.randomLabel(), phraseGen.randomLabel() ], user1,
			days, tasking_main_page.displayDate(days));
};

taskInformation.prototype.editTaskValues = function(value, status, obj) {
	var editTaskTest = new taskData(obj["addTaskSummary"], obj["addTaskDescription"], obj["addTasklocation"],
			obj["labelEntry"], obj["addTaskAssignee"], obj["addedDays"], obj["displayDate"]);
	for (var count = 0; count < value.length; count++) {
		if (value[count] == "taskDetailsSummary") {
			editTaskTest.taskDetailsSummary = phraseGen.randomPhrase();
			;
			editTaskTest.addTaskSummary = editTaskTest["taskDetailsSummary"];
		} else if (value[count] == "taskDetailsDescription") {
			editTaskTest.taskDetailsDescription = phraseGen.randomPhrase();
			;
			editTaskTest.addTaskDescription = editTaskTest["taskDetailsDescription"];
		} else if (value[count] == "addTasklocation") {
			editTaskTest.addTasklocation = phraseGen.randomLocation();
			;
		} else if (value[count] == "addedDays") {
			editTaskTest.addedDays = daysEdit;
		} else if (value[count] == "addTaskAssignee") {
			editTaskTest.addTaskAssignee = user2;
		} else if (value[count] == "labelEntry") {
			editTaskTest.labelEntry = [ phraseGen.randomLabel(), phraseGen.randomLabel(), phraseGen.randomLabel(),
					phraseGen.randomLabel() ];
		}
	}
	editTaskTest.existingCommentAuthor = user1;
	editTaskTest.existingCommentDateTime = tasking_main_page.displayDate(0);
	editTaskTest.existingCommentText = comment;
	editTaskTest.taskStatus = status;
	if (editTaskTest["taskStatus"] == "blocked") {
		editTaskTest.flag = "taskBlocked"
	} else if (editTaskTest["taskStatus"] == "complete") {
		editTaskTest.flag = "taskComplete"
	} else if (editTaskTest["taskStatus"] == "canceled") {
		editTaskTest.flag = "taskCanceled"
	} else {
	}

	return editTaskTest;
}

exports.taskInformation = new taskInformation();