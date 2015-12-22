var taskInformation = function() {
};

var phraseGen = require('../pages/phraseGen.js').phraseGen;
var tasking_main_page = require('../pages/tasking_main_page.js').tasking_main_page;

var user1 = "Test User1";
var user2 = "Test User2";
var days = 30;
var daysEdit = 10;
var comment = phraseGen.randomPhrase();

var displayDate = function(days) {
	return tasking_main_page.displayDate(days);
}

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

taskInformation.prototype.task001Entry = function() {
	return [ "addTaskSummary", "addTaskAssignee" ];
};

taskInformation.prototype.task001 = function() {
	var task001 = new taskData();
	task001.addTaskSummary = "Task 001";
	task001.taskStatus = "on hold";
	task001.addTaskAssignee = "Test User2"
	return task001;
};

taskInformation.prototype.task002Entry = function() {
	return [ "addTaskSummary", "addTaskAssignee" ];
};

taskInformation.prototype.task002 = function() {
	var task002 = new taskData();
	task002.addTaskSummary = "Task 002";
	task002.taskStatus = "in progress";
	task002.addTaskAssignee = "Test User2"
	return task002;
};

taskInformation.prototype.task003Entry = function() {
	return [ "addTaskSummary", "labelEntry" ];
};

taskInformation.prototype.task003 = function() {
	var task003 = new taskData();
	task003.addTaskSummary = "Task 003";
	task003.taskStatus = "in progress";
	task003.labelEntry = [ 'label 3', 'label 4' ];
	return task003;
};

taskInformation.prototype.task004Entry = function() {
	return [ "addTaskSummary", "labelEntry", "addedDays", "addTasklocation", "addTaskDescription", "addTaskAssignee" ];
};

taskInformation.prototype.task004 = function() {
	var task004 = new taskData();
	task004.addTaskSummary = "Task 004";
	task004.addedDays = 5;
	task004.displayDate = displayDate(5);
	task004.addTasklocation = "location 1";
	task004.taskStatus = "in progress";
	task004.labelEntry = [ 'label 1', 'label 2' ];
	task004.addTaskAssignee = "Test User1";
	task004.existingCommentText = "a really well thought out test comment";
	task004.existingCommentAuthor = "Test User1";
	task004.existingCommentDateTime = displayDate(0);
	task004.addTaskDescription = "a great description 1";
	return task004;
};

taskInformation.prototype.task005Entry = function() {
	return [ "addTaskSummary", "addTaskDescription", "addTaskAssignee" ];
};

taskInformation.prototype.task005 = function() {
	var task005 = new taskData();
	task005.addTaskSummary = "Task 005";
	task005.taskStatus = "in progress";
	task005.addTaskAssignee = "Test User1";
	task005.addTaskDescription = "a great description 2";
	return task005;
};

taskInformation.prototype.task006Entry = function() {
	return [ "addTaskSummary", "addTaskAssignee" ];
};

taskInformation.prototype.task006 = function() {
	var task006 = new taskData();
	task006.addTaskSummary = "Task 006";
	task006.taskStatus = "canceled";
	task006.flag = "taskCanceled"
	task006.addTaskAssignee = "Test User1";
	return task006;
};

taskInformation.prototype.task007Entry = function() {
	return [ "addTaskSummary", "addTaskAssignee" ];
};

taskInformation.prototype.task007 = function() {
	var task007 = new taskData();
	task007.addTaskSummary = "Task 007";
	task007.addTaskAssignee = "Test User2";
	task007.taskStatus = "complete";
	task007.flag = "taskComplete"
	return task007;
};

taskInformation.prototype.task008Entry = function() {
	return [ "addTaskSummary", "labelEntry", "addedDays", "addTasklocation", "addTaskAssignee" ];
};

taskInformation.prototype.task008 = function() {
	var task008 = new taskData();
	task008.addTaskSummary = "Task 008";
	task008.addedDays = 5;
	task008.displayDate = displayDate(5);
	task008.addTasklocation = "location 2";
	task008.taskStatus = "in progress";
	task008.labelEntry = [ 'label 1', 'label 3' ];
	task008.addTaskAssignee = "Test User2";
	task008.existingCommentAuthor = "Test User2";
	task008.existingCommentDateTime = displayDate(0);
	task008.existingCommentText = "a really well thought out test comment";
	return task008;
};

taskInformation.prototype.task009Entry = function() {
	return [ "addTaskSummary", "labelEntry", "addTasklocation", "addTaskAssignee", "addTaskDescription", "addedDays" ];
};

taskInformation.prototype.task009 = function() {
	var task009 = new taskData();
	task009.addTaskSummary = "Task 009";
	task009.addedDays = 1;
	task009.displayDate = displayDate(1);
	task009.addTasklocation = "location 1";
	task009.taskStatus = "in progress";
	task009.labelEntry = [ 'label 1', 'label 4' ];
	task009.addTaskAssignee = "Test User1";
	task009.existingCommentAuthor = "Test User1";
	task009.existingCommentDateTime = displayDate(0);
	task009.existingCommentText = "a really well thought out test comment";
	task009.addTaskDescription = "a great description 1";
	return task009;
};

taskInformation.prototype.task010Entry = function() {
	return [ "addTaskSummary", "labelEntry", "addTasklocation", "addTaskAssignee", "addedDays", "addTaskDescription" ];
};

taskInformation.prototype.task010 = function() {
	var task010 = new taskData();
	task010.addTaskSummary = "Task 010";
	task010.addedDays = 2;
	task010.displayDate = displayDate(2);
	task010.addTasklocation = "location 2";
	task010.taskStatus = "in progress";
	task010.labelEntry = [ 'label 2', 'label 4' ];
	task010.addTaskAssignee = "Test User1";
	task010.existingCommentAuthor = "Test User2";
	task010.existingCommentDateTime = displayDate(0);
	task010.existingCommentText = "a really well thought out test comment";
	task010.addTaskDescription = "a great description 2";
	return task010;
};

taskInformation.prototype.task011Entry = function() {
	return [ "addTaskSummary", "addTaskAssignee" ];
};

taskInformation.prototype.task011 = function() {
	var task011 = new taskData();
	task011.addTaskSummary = "Task 011";
	task011.addTaskAssignee = "Test User1";
	task011.taskStatus = "not started";
	return task011;
};

taskInformation.prototype.task012Entry = function() {
	return [ "addTaskSummary", "addedDays" ];
};

taskInformation.prototype.task012 = function() {
	var task012 = new taskData();
	task012.addTaskSummary = "Task 012";
	task012.addedDays = 0;
	task012.displayDate = displayDate(0);
	task012.taskStatus = "in progress";
	return task012;
};

taskInformation.prototype.task013Entry = function() {
	return [ "addTaskSummary" ];
};

taskInformation.prototype.task013 = function() {
	var task013 = new taskData();
	task013.addTaskSummary = "Task 013";
	task013.taskStatus = "in progress";
	return task013;
};

taskInformation.prototype.task014Entry = function() {
	return [ "addTaskSummary" ];
};

taskInformation.prototype.task014 = function() {
	var task014 = new taskData();
	task014.addTaskSummary = "Task 014";
	task014.taskStatus = "in progress";
	return task014;
};

taskInformation.prototype.task015Entry = function() {
	return [ "addTaskSummary", "addTaskAssignee" ];
};

taskInformation.prototype.task015 = function() {
	var task015 = new taskData();
	task015.addTaskSummary = "Task 015";
	task015.taskStatus = "in progress";
	task015.addTaskAssignee = "Test User2";
	return task015;
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
};

exports.taskInformation = new taskInformation();