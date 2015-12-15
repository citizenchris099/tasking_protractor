var login_page = require('../pages/login_page.js').login_page;
var tasking_main_page = require('../pages/tasking_main_page.js').tasking_main_page;
var phraseGen = require('../pages/phraseGen.js').phraseGen;
var localTasking = 'http://localhost:3000/';
var publicTasking = 'http://tasking.scienergydev.com/'
var username001 = 'testusername';
var password001 = 'testpassword';
var username002 = 'testusername2';
var password002 = 'testpassword2';
var username003 = 'wr';
var password003 = 'wr';
var uNameError = "User not found";
var pWordError = "Incorrect password";
var taskEntry = [ "addTaskSummary", "addTaskDescription", "addTasklocation",
		"labelEntry", "addedDays", "addTaskAssignee" ];
var taskEdit = [ "taskDetailsSummary", "taskDetailsDescription",
		"addTasklocation", "addTaskAssignee", "labelEntry" ];
var summary = phraseGen.randomPhrase();
var description = phraseGen.randomPhrase();
var label1 = phraseGen.randomLabel();
var label2 = phraseGen.randomLabel();
var label3 = phraseGen.randomLabel();
var label4 = phraseGen.randomLabel();
var location = phraseGen.randomLocation();
var summaryEdit = phraseGen.randomPhrase();
var descriptionEdit = phraseGen.randomPhrase();
var label5 = phraseGen.randomLabel();
var label6 = phraseGen.randomLabel();
var label7 = phraseGen.randomLabel();
var label8 = phraseGen.randomLabel();
var locationEdit = phraseGen.randomLocation();
var user1 = "Test User";
var user2 = "Test User2";
var days = 30;
var daysEdit = 10;
var comment = phraseGen.randomPhrase();

function taskData(addTaskSummary, addTaskDescription, addTasklocation,
		labelEntry, addTaskAssignee, addedDays, displayDate,
		taskDetailsSummary, taskDetailsDescription, existingCommentAuthor,
		existingCommentDateTime, existingCommentText, taskStatus, flag) {
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

var addTaskData = function() {
	return new taskData(phraseGen.randomPhrase(), phraseGen.randomPhrase(),
			phraseGen.randomLocation(), [ phraseGen.randomLabel(),
					phraseGen.randomLabel(), phraseGen.randomLabel(),
					phraseGen.randomLabel() ], user1, days, tasking_main_page
					.displayDate(days));
}

var editTaskValues = function(value, status, obj) {
	var editTaskTest = new taskData(obj["addTaskSummary"],
			obj["addTaskDescription"], obj["addTasklocation"],
			obj["labelEntry"], obj["addTaskAssignee"], obj["addedDays"],
			obj["displayDate"]);
	for (var count = 0; count < value.length; count++) {
		if (value[count] == "taskDetailsSummary") {
			editTaskTest.taskDetailsSummary = summaryEdit;
			editTaskTest.addTaskSummary = editTaskTest["taskDetailsSummary"];
		} else if (value[count] == "taskDetailsDescription") {
			editTaskTest.taskDetailsDescription = descriptionEdit;
			editTaskTest.addTaskDescription = editTaskTest["taskDetailsDescription"];
		} else if (value[count] == "addTasklocation") {
			editTaskTest.addTasklocation = locationEdit;
		} else if (value[count] == "addedDays") {
			editTaskTest.addedDays = daysEdit;
		} else if (value[count] == "addTaskAssignee") {
			editTaskTest.addTaskAssignee = user2;
		} else if (value[count] == "labelEntry") {
			editTaskTest.labelEntry = [ label5, label6, label7, label8 ];
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
		console.log("editTaskValues made it to else")
	}

	return editTaskTest;
}

describe('tasking tests', function() {

	beforeEach(function() {
		browser.ignoreSynchronization = true;
		browser.driver.get(localTasking);
		browser.manage().timeouts().implicitlyWait(5000);
		browser.driver.manage().window().maximize();
	});
	afterEach(function() {
	});

	describe('add task tests', function() {
		beforeEach(function() {
			login_page.isLoginPageLoaded();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.isMainPageLoaded();
		});

		afterEach(function() {
			tasking_main_page.logOut();
			login_page.isLoginPageLoaded();
		});

		it('search task :  summary', function() {
			var addTaskTest = addTaskData();
			console.log("addTaskTest summary = "
					+ addTaskTest["addTaskSummary"]);
			tasking_main_page.addTask(taskEntry, addTaskTest);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.useSearchFilter(addTaskTest, addTaskTest["addTaskSummary"]);
		});
		xit('simple add task', function() {
			var addTaskTest = addTaskData();
			console.log("addTaskTest summary = "
					+ addTaskTest["addTaskSummary"]);
			tasking_main_page.addTask(taskEntry, addTaskTest);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
		});
		xit('block task', function() {
			var addTaskTest = addTaskData();
			var blockTaskTest = editTaskValues([ "" ], "blocked", addTaskTest);
			tasking_main_page.addTask(taskEntry, addTaskTest);
			tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.blockTask(addTaskTest);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.checkTaskNotInQueue(blockTaskTest, "Closed");
			tasking_main_page.checkTaskInQueue(blockTaskTest, "Open");
			tasking_main_page.checkTaskDetails(taskEntry, blockTaskTest);
			tasking_main_page.checkTaskDetailsBlocked(blockTaskTest, true);
			tasking_main_page.checkTaskFlag(blockTaskTest, true);

		});
		xit('cancel task', function() {
			var addTaskTest = addTaskData();
			var cancelTaskTest = editTaskValues([ "" ], "canceled", addTaskTest);
			tasking_main_page.addTask(taskEntry, addTaskTest);
			tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.cancelTask(addTaskTest);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.checkTaskNotInQueue(cancelTaskTest, "Open");
			tasking_main_page.checkTaskInQueue(cancelTaskTest, "Closed");
			tasking_main_page.checkTaskDetails(taskEntry, cancelTaskTest);
			tasking_main_page.checkTaskDetailsCanceled(cancelTaskTest, true);
			tasking_main_page.checkTaskFlag(cancelTaskTest, true);

		});
		xit('edit task details', function() {
			var addTaskTest = addTaskData();
			var editTaskTest = editTaskValues(taskEdit, "not started", addTaskTest);
			tasking_main_page.addTask(taskEntry, addTaskTest);
			tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.editTaskDetails(taskEdit, addTaskTest,
					editTaskTest);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.checkTaskDetails(taskEntry, editTaskTest);
			tasking_main_page.checkTaskDetails(taskEdit, editTaskTest);
		});
		xit('add comment', function() {
			var addTaskTest = addTaskData();
			var commentTaskTest = editTaskValues([ "" ], "not started",
					addTaskTest);
			tasking_main_page.addTask(taskEntry, addTaskTest);
			tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.addComment(comment);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.checkComment(commentTaskTest);
		});
		xit('change task status in progress', function() {
			var addTaskTest = addTaskData();
			var changeStatusTaskTest = editTaskValues([ "" ], "in progress",
					addTaskTest);
			console.log("addTaskTest summary = "
					+ addTaskTest["addTaskSummary"]
					+ " changeStatusTaskTest summary = "
					+ changeStatusTaskTest["addTaskSummary"]);
			tasking_main_page.addTask(taskEntry, addTaskTest);
			tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.changeTaskStatus(changeStatusTaskTest);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.checkTaskNotInQueue(changeStatusTaskTest,
					"Closed");
			tasking_main_page.checkTaskInQueue(changeStatusTaskTest, "Open");
			tasking_main_page.checkTaskStatus(changeStatusTaskTest);

		});
		xit('change task status complete', function() {
			var addTaskTest = addTaskData();
			var completeTaskTest = editTaskValues([ "" ], "complete",
					addTaskTest);
			console.log("addTaskTest summary = "
					+ addTaskTest["addTaskSummary"]
					+ " completeTaskTest summary = "
					+ completeTaskTest["addTaskSummary"]);
			tasking_main_page.addTask(taskEntry, addTaskTest);
			tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.changeTaskStatus(completeTaskTest);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.checkTaskNotInQueue(completeTaskTest, "Open");
			tasking_main_page.checkTaskInQueue(completeTaskTest, "Closed");
			tasking_main_page.checkTaskFlag(completeTaskTest);
		});
	});

	describe('failed login tests', function() {
		beforeEach(function() {
			login_page.isLoginPageLoaded();
		});

		afterEach(function() {
			login_page.isLoginPageLoaded();
		});

		xit('bad username test', function() {
			login_page.taskingLoginFail("wrong", password001, uNameError);
		});

		xit('bad password test', function() {
			login_page.taskingLoginFail(username001, "bad", pWordError);
		});
	});

});
