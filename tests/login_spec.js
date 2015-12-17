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
var taskEntry = [ "addTaskSummary", "addTaskDescription", "addTasklocation", "labelEntry", "addedDays", "addTaskAssignee" ];
var taskEdit = [ "taskDetailsSummary", "taskDetailsDescription", "addTasklocation", "addTaskAssignee", "labelEntry" ];
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

var addTaskData = function() {
	return new taskData(phraseGen.randomPhrase(), phraseGen.randomPhrase(), phraseGen.randomLocation(), [
			phraseGen.randomLabel(), phraseGen.randomLabel(), phraseGen.randomLabel(), phraseGen.randomLabel() ], user1,
			days, tasking_main_page.displayDate(days));
}

var editTaskValues = function(value, status, obj) {
	var editTaskTest = new taskData(obj["addTaskSummary"], obj["addTaskDescription"], obj["addTasklocation"],
			obj["labelEntry"], obj["addTaskAssignee"], obj["addedDays"], obj["displayDate"]);
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
		xit('simple add task', function() {
			var addTaskTest = addTaskData();
			console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
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
			tasking_main_page.editTaskDetails(taskEdit, addTaskTest, editTaskTest);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.checkTaskDetails(taskEntry, editTaskTest);
			tasking_main_page.checkTaskDetails(taskEdit, editTaskTest);
		});
		xit('add comment', function() {
			var addTaskTest = addTaskData();
			var commentTaskTest = editTaskValues([ "" ], "not started", addTaskTest);
			tasking_main_page.addTask(taskEntry, addTaskTest);
			tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.addComment(comment);
			tasking_main_page.logOut();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.checkComment(commentTaskTest);
		});
		xdescribe('add task status tests', function() {
			it('change task status in progress', function() {
				var addTaskTest = addTaskData();
				var changeStatusTaskTest = editTaskValues([ "" ], "in progress", addTaskTest);
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"] + " changeStatusTaskTest summary = "
						+ changeStatusTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
				tasking_main_page.logOut();
				login_page.taskingLogin(username001, password001);
				tasking_main_page.changeTaskStatus(changeStatusTaskTest);
				tasking_main_page.logOut();
				login_page.taskingLogin(username001, password001);
				tasking_main_page.checkTaskNotInQueue(changeStatusTaskTest, "Closed");
				tasking_main_page.checkTaskInQueue(changeStatusTaskTest, "Open");
				tasking_main_page.checkTaskStatus(changeStatusTaskTest);

			});
			it('change task status complete', function() {
				var addTaskTest = addTaskData();
				var completeTaskTest = editTaskValues([ "" ], "complete", addTaskTest);
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"] + " completeTaskTest summary = "
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
				tasking_main_page.checkTaskFlag(completeTaskTest, true);
			});
		});
		xdescribe('add task quick filter tests', function() {
			it('search task :  summary', function() {
				var addTaskTest = addTaskData();
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.logOut();
				login_page.taskingLogin(username001, password001);
				tasking_main_page.useSearchFilter(addTaskTest, addTaskTest["addTaskSummary"]);
				tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
			});
			it('my tasks quick filter happy', function() {
				var addTaskTest = addTaskData();
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.logOut();
				login_page.taskingLogin(username001, password001);
				tasking_main_page.myTasksFilter();
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
				tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
			});
			it('my tasks quick filter', function() {
				var addTaskTest = addTaskData();
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.logOut();
				login_page.taskingLogin(username002, password002);
				tasking_main_page.myTasksFilter();
				tasking_main_page.checkTaskNotInQueue(addTaskTest, "Open");
			});
			it('all tasks quick filter', function() {
				var addTaskTest = addTaskData();
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.logOut();
				login_page.taskingLogin(username002, password002);
				tasking_main_page.myTasksFilter();
				tasking_main_page.checkTaskNotInQueue(addTaskTest, "Open");
				tasking_main_page.allTasksFilter();
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
				tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
			});
			it('tasks I created quick filter happy', function() {
				var addTaskTest = addTaskData();
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.tasksICreatedQuickFilter();
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
				tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
			});
			it('tasks I created quick filter', function() {
				var addTaskTest = addTaskData();
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.logOut();
				login_page.taskingLogin(username002, password002);
				tasking_main_page.tasksICreatedQuickFilter();
				tasking_main_page.checkTaskNotInQueue(addTaskTest, "Open");
			});
			it('blocked tasks quick filter happy', function() {
				var addTaskTest = addTaskData();
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.blockTask(addTaskTest);
				tasking_main_page.blockedTasksQuickFilter();
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			it('blocked tasks quick filter', function() {
				var addTaskTest = addTaskData();
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.blockedTasksQuickFilter();
				tasking_main_page.checkTaskNotInQueue(addTaskTest, "Open");
			});
			it('starred tasks quick filter happy', function() {
				var addTaskTest = addTaskData();
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.starTaskInQueue(addTaskTest);
				tasking_main_page.tasksIStarredQuickFilter();
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			it('starred tasks quick filter', function() {
				var addTaskTest = addTaskData();
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.tasksIStarredQuickFilter();
				tasking_main_page.checkTaskNotInQueue(addTaskTest, "Open");
			});
			it('starred tasks quick filter', function() {
				var addTaskTest = addTaskData();
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.starTaskInQueue(addTaskTest);
				tasking_main_page.logOut();
				login_page.taskingLogin(username002, password002);
				tasking_main_page.tasksIStarredQuickFilter();
				tasking_main_page.checkTaskNotInQueue(addTaskTest, "Open");
			});

		});
		describe('add task all filters tests', function() {
			xit('All filters Location happy', function() {
				var addTaskTest = addTaskData();
				var allFilterMenus = [ "allFilterLocation" ];
				var allFilterSelections = [ addTaskTest["addTasklocation"] ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			it('All filters Location Search happy', function() {
				var addTaskTest = addTaskData();
				var allFilterMenus = [ "allFilterLocation" ];
				var allFilterSelections = [ addTaskTest["addTasklocation"] ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFiltersSearch(allFilterMenus, allFilterSelections, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters Due happy', function() {
				var addTaskTest = addTaskData();
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilterDueDate(days, days);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters Labels happy:  one label', function() {
				var addTaskTest = addTaskData();
				var labels = addTaskTest["labelEntry"];
				var allFilterMenus = [ "allFilterLabels" ];
				var allFilterSelections = [ labels[0] ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			it('All filters Labels search happy:  one label', function() {
				var addTaskTest = addTaskData();
				var labels = addTaskTest["labelEntry"];
				var allFilterMenus = [ "allFilterLabels" ];
				var allFilterSelections = [ labels[0] ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFiltersSearch(allFilterMenus, allFilterSelections, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters Labels happy:  multiple labels', function() {
				var addTaskTest = addTaskData();
				var labels = addTaskTest["labelEntry"];
				var allFilterMenus = [ "allFilterLabels", "allFilterLabels", "allFilterLabels", "allFilterLabels" ];
				var allFilterSelections = [ labels[0], labels[1], labels[2], labels[3] ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters Assignee happy', function() {
				var addTaskTest = addTaskData();
				var allFilterMenus = [ "allFilterAssignee" ];
				var allFilterSelections = [ "testuid1" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters status happy :  in progress', function() {
				var addTaskTest = addTaskData();
				var changeStatusTaskTest = editTaskValues([ "" ], "in progress", addTaskTest);
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"] + " changeStatusTaskTest summary = "
						+ changeStatusTaskTest["addTaskSummary"]);
				var allFilterMenus = [ "allFilterStatus" ];
				var allFilterSelections = [ "In Progress" ];
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
				tasking_main_page.changeTaskStatus(changeStatusTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters status :  in progress', function() {
				var addTaskTest = addTaskData();
				var changeStatusTaskTest = editTaskValues([ "" ], "in progress", addTaskTest);
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"] + " changeStatusTaskTest summary = "
						+ changeStatusTaskTest["addTaskSummary"]);
				var allFilterMenus = [ "allFilterStatus" ];
				var allFilterSelections = [ "Not Started" ];
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
				tasking_main_page.changeTaskStatus(changeStatusTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskNotInQueue(addTaskTest, "Open");
			});
			xit('All filters more options starred happy', function() {
				var addTaskTest = addTaskData();
				var allFilterMenus = [ "allFilterMoreO" ];
				var allFilterSelections = [ "Tasks I Starred" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.starTaskInQueue(addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters more options blocked happy', function() {
				var addTaskTest = addTaskData();
				var allFilterMenus = [ "allFilterMoreO" ];
				var allFilterSelections = [ "Blocked Tasks" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.blockTask(addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters more options i created happy', function() {
				var addTaskTest = addTaskData();
				var allFilterMenus = [ "allFilterMoreO" ];
				var allFilterSelections = [ "Tasks I Created" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters more options i created', function() {
				var addTaskTest = addTaskData();
				var allFilterMenus = [ "allFilterMoreO" ];
				var allFilterSelections = [ "Tasks I Created" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.logOut();
				login_page.taskingLogin(username002, password002);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskNotInQueue(addTaskTest, "Open");
			});
			xit('All filters multiple filters happy', function() {
				var addTaskTest = addTaskData();
				var labels = addTaskTest["labelEntry"];
				var allFilterMenus = [ "allFilterMoreO", "allFilterLocation", "allFilterLabels", "allFilterLabels",
						"allFilterLabels", "allFilterLabels", "allFilterAssignee", "allFilterStatus" ];
				var allFilterSelections = [ "Tasks I Created", addTaskTest["addTasklocation"], labels[0], labels[1],
						labels[2], labels[3], "testuid1", "Not Started" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters clear filters', function() {
				var addTaskTest = addTaskData();
				var allFilterMenus = [ "allFilterMoreO" ];
				var allFilterSelections = [ "Tasks I Created" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.logOut();
				login_page.taskingLogin(username002, password002);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskNotInQueue(addTaskTest, "Open");
				tasking_main_page.clearAllFilterSelection();
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters multiple filters count happy', function() {
				var addTaskTest = addTaskData();
				var labels = addTaskTest["labelEntry"];
				var allFilterMenus = [ "allFilterMoreO", "allFilterLocation", "allFilterLabels", "allFilterLabels",
						"allFilterLabels", "allFilterLabels", "allFilterAssignee", "allFilterStatus" ];
				var allFilterSelections = [ "Tasks I Created", addTaskTest["addTasklocation"], labels[0], labels[1],
						labels[2], labels[3], "testuid1", "Not Started" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
				tasking_main_page.allFilterCountCheck("5", true)
			});
		});
	});

	xdescribe('failed login tests', function() {
		beforeEach(function() {
			login_page.isLoginPageLoaded();
		});

		afterEach(function() {
			login_page.isLoginPageLoaded();
		});

		it('bad username test', function() {
			login_page.taskingLoginFail("wrong", password001, uNameError);
		});

		it('bad password test', function() {
			login_page.taskingLoginFail(username001, "bad", pWordError);
		});
	});

});
