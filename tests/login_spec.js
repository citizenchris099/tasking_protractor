var login_page = require('../pages/login_page.js').login_page;
var tasking_main_page = require('../pages/tasking_main_page.js').tasking_main_page;
var phraseGen = require('../pages/phraseGen.js').phraseGen;
var taskInformation = require('./taskInformation.js').taskInformation;

// //////// task objects//////////
var task001Obj = taskInformation.task001();
var task002Obj = taskInformation.task002();
var task003Obj = taskInformation.task003();
var task004Obj = taskInformation.task004();
var task005Obj = taskInformation.task005();
var task006Obj = taskInformation.task006();
var task007Obj = taskInformation.task007();
var task008Obj = taskInformation.task008();
var task009Obj = taskInformation.task009();
var task010Obj = taskInformation.task010();
var task011Obj = taskInformation.task011();
var task012Obj = taskInformation.task012();
var task013Obj = taskInformation.task013();
var task014Obj = taskInformation.task014();
var task015Obj = taskInformation.task015();

// ////////entry & edit data arrays//////////
var taskEntry = [ "addTaskSummary", "addTaskDescription", "addTasklocation", "labelEntry", "addedDays", "addTaskAssignee" ];
var taskEdit = [ "taskDetailsSummary", "taskDetailsDescription", "addTasklocation", "addTaskAssignee", "labelEntry" ];
var task001Entry = taskInformation.task001Entry();
var task002Entry = taskInformation.task002Entry();
var task003Entry = taskInformation.task003Entry();
var task004Entry = taskInformation.task004Entry();
var task005Entry = taskInformation.task005Entry();
var task006Entry = taskInformation.task006Entry();
var task007Entry = taskInformation.task007Entry();
var task008Entry = taskInformation.task008Entry();
var task009Entry = taskInformation.task009Entry();
var task010Entry = taskInformation.task010Entry();
var task011Entry = taskInformation.task011Entry();
var task012Entry = taskInformation.task012Entry();
var task013Entry = taskInformation.task013Entry();
var task014Entry = taskInformation.task014Entry();
var task015Entry = taskInformation.task015Entry();

var user1 = "Test User";
var user2 = "Test User2";
var days = 30;
var daysEdit = 10;
var comment = phraseGen.randomPhrase();
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

describe('tasking tests', function() {

	beforeEach(function() {
		browser.ignoreSynchronization = true;
		browser.driver.get(localTasking);
		browser.manage().timeouts().implicitlyWait(5000);
		browser.driver.manage().window().maximize();
	});
	afterEach(function() {
	});
	describe('fixture data tests', function() {
		beforeEach(function() {
			login_page.isLoginPageLoaded();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.isMainPageLoaded();
		});

		afterEach(function() {
			tasking_main_page.logOut();
			login_page.isLoginPageLoaded();
		});

		xdescribe('task detail validation', function() {
			it('fixture data task001 task detail verification', function() {
				tasking_main_page.checkTaskInQueue(task001Obj, "Open");
				tasking_main_page.checkTaskDetails(task001Entry, task001Obj);
			});

			it('fixture data task002 task detail verification', function() {
				tasking_main_page.checkTaskInQueue(task002Obj, "Open");
				tasking_main_page.checkTaskDetails(task002Entry, task002Obj);
			});

			it('fixture data task003 task detail verification', function() {
				tasking_main_page.checkTaskInQueue(task003Obj, "Open");
				tasking_main_page.checkTaskDetails(task003Entry, task003Obj);
			});

			it('fixture data task004 task detail verification', function() {
				tasking_main_page.checkTaskInQueue(task004Obj, "Open");
				tasking_main_page.checkTaskDetails(task004Entry, task004Obj);
			});

			it('fixture data task005 task detail verification', function() {
				tasking_main_page.checkTaskInQueue(task005Obj, "Open");
				tasking_main_page.checkTaskDetails(task005Entry, task005Obj);
			});

			it('fixture data task006 task detail verification', function() {
				tasking_main_page.checkTaskInQueue(task006Obj, "Closed");
				tasking_main_page.checkTaskDetails(task006Entry, task006Obj);
			});

			it('fixture data task007 task detail verification', function() {
				tasking_main_page.checkTaskInQueue(task007Obj, "Closed");
				tasking_main_page.checkTaskDetails(task007Entry, task007Obj);
			});

			it('fixture data task008 task detail verification', function() {
				tasking_main_page.checkTaskInQueue(task008Obj, "Open");
				tasking_main_page.checkTaskDetails(task008Entry, task008Obj);
			});

			it('fixture data task009 task detail verification', function() {
				tasking_main_page.checkTaskInQueue(task009Obj, "Open");
				tasking_main_page.checkTaskDetails(task009Entry, task009Obj);
			});

			it('fixture data task010 task detail verification', function() {
				tasking_main_page.checkTaskInQueue(task010Obj, "Open");
				tasking_main_page.checkTaskDetails(task010Entry, task010Obj);
			});

			it('fixture data task011 task detail verification', function() {
				tasking_main_page.checkTaskInQueue(task011Obj, "Open");
				tasking_main_page.checkTaskDetails(task011Entry, task011Obj);
			});

			it('fixture data task012 task detail verification', function() {
				tasking_main_page.checkTaskInQueue(task012Obj, "Open");
				tasking_main_page.checkTaskDetails(task012Entry, task012Obj);
			});

			it('fixture data task013 task detail verification', function() {
				tasking_main_page.checkTaskInQueue(task013Obj, "Open");
				tasking_main_page.checkTaskDetails(task013Entry, task013Obj);
			});

			it('fixture data task014 task detail verification', function() {
				tasking_main_page.checkTaskInQueue(task014Obj, "Open");
				tasking_main_page.checkTaskDetails(task014Entry, task014Obj);
			});

			it('fixture data task015 task detail verification', function() {
				tasking_main_page.checkTaskInQueue(task015Obj, "Open");
				tasking_main_page.checkTaskDetails(task015Entry, task015Obj);
			});
		});

		xdescribe('status validation', function() {
			it('fixture data task001 status verification', function() {
				tasking_main_page.checkTaskInQueue(task001Obj, "Open");
				tasking_main_page.checkTaskStatus(task001Obj);
			});

			it('fixture data task002 status verification', function() {
				tasking_main_page.checkTaskInQueue(task002Obj, "Open");
				tasking_main_page.checkTaskStatus(task002Obj);
			});

			it('fixture data task003 status verification', function() {
				tasking_main_page.checkTaskInQueue(task003Obj, "Open");
				tasking_main_page.checkTaskStatus(task003Obj);
			});

			it('fixture data task004 status verification', function() {
				tasking_main_page.checkTaskInQueue(task004Obj, "Open");
				tasking_main_page.checkTaskStatus(task004Obj);
			});

			it('fixture data task005 status verification', function() {
				tasking_main_page.checkTaskInQueue(task005Obj, "Open");
				tasking_main_page.checkTaskStatus(task005Obj);
			});

			it('fixture data task006 status verification', function() {
				tasking_main_page.checkTaskInQueue(task006Obj, "Closed");
				tasking_main_page.checkTaskFlag(task006Obj, true);
			});

			it('fixture data task007 status verification', function() {
				tasking_main_page.checkTaskInQueue(task007Obj, "Closed");
				tasking_main_page.checkTaskFlag(task007Obj, true);
			});

			it('fixture data task008 status verification', function() {
				tasking_main_page.checkTaskInQueue(task008Obj, "Open");
				tasking_main_page.checkTaskStatus(task008Obj);
			});

			it('fixture data task009 status verification', function() {
				tasking_main_page.checkTaskInQueue(task009Obj, "Open");
				tasking_main_page.checkTaskStatus(task009Obj);
			});

			it('fixture data task010 status verification', function() {
				tasking_main_page.checkTaskInQueue(task010Obj, "Open");
				tasking_main_page.checkTaskStatus(task010Obj);
			});

			it('fixture data task011 status verification', function() {
				tasking_main_page.checkTaskInQueue(task011Obj, "Open");
				tasking_main_page.checkTaskStatus(task011Obj);
			});

			it('fixture data task012 status verification', function() {
				tasking_main_page.checkTaskInQueue(task012Obj, "Open");
				tasking_main_page.checkTaskStatus(task012Obj);
			});

			it('fixture data task013 status verification', function() {
				tasking_main_page.checkTaskInQueue(task013Obj, "Open");
				tasking_main_page.checkTaskStatus(task013Obj);
			});

			it('fixture data task014 status verification', function() {
				tasking_main_page.checkTaskInQueue(task014Obj, "Open");
				tasking_main_page.checkTaskStatus(task014Obj);
			});

			it('fixture data task015 status verification', function() {
				tasking_main_page.checkTaskInQueue(task015Obj, "Open");
				tasking_main_page.checkTaskStatus(task015Obj);
			});

		});
		describe('filter validation', function() {
			describe('my tasks quick filter validation', function() {
				describe('my tasks quick filter validation:  test user1', function() {
					it('test user1 my tasks quick filter task003 visible', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskInQueue(task003Obj, "Open");
					});
					it('test user1 my tasks quick filter task004 visible', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskInQueue(task004Obj, "Open");
					});
					it('test user1 my tasks quick filter task005 visible', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskInQueue(task005Obj, "Open");
					});
					it('test user1 my tasks quick filter task006 visible', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskInQueue(task006Obj, "Closed");
					});
					it('test user1 my tasks quick filter task009 visible', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskInQueue(task009Obj, "Open");
					});
					it('test user1 my tasks quick filter task010 visible', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskInQueue(task010Obj, "Open");
					});
					it('test user1 my tasks quick filter task011 visible', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskInQueue(task011Obj, "Open");
					});
					it('test user1 my tasks quick filter task001 not visible', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskNotInQueue(task001Obj, "Open");
					});
					it('test user1 my tasks quick filter task002 not visible', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskNotInQueue(task002Obj, "Open");
					});
					it('test user1 my tasks quick filter task007 not visible', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskNotInQueue(task007Obj, "Closed");
					});
					it('test user1 my tasks quick filter task008 not visible', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskNotInQueue(task008Obj, "Open");
					});
					it('test user1 my tasks quick filter task012 not visible', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskNotInQueue(task012Obj, "Open");
					});
					it('test user1 my tasks quick filter task013 not visible', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskNotInQueue(task013Obj, "Open");
					});
					it('test user1 my tasks quick filter task014 not visible', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskNotInQueue(task014Obj, "Open");
					});
					it('test user1 my tasks quick filter task015 not visible', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskNotInQueue(task015Obj, "Open");
					});
					describe('my tasks quick filter validation:  test user1', function() {
						
					});
				});

			});

		});

	});

	xdescribe('add task tests', function() {
		beforeEach(function() {
			login_page.isLoginPageLoaded();
			login_page.taskingLogin(username001, password001);
			tasking_main_page.isMainPageLoaded();
		});

		afterEach(function() {
			tasking_main_page.logOut();
			login_page.isLoginPageLoaded();
		});
		describe('basic add & edit tests', function() {
			xit('simple add task', function() {
				var addTaskTest = taskInformation.addTaskData();
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.logOut();
				login_page.taskingLogin(username001, password001);
				tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
			});
			xit('edit task details', function() {
				var addTaskTest = taskInformation.addTaskData();
				var editTaskTest = taskInformation.editTaskValues(taskEdit, "not started", addTaskTest);
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

			it('add comment', function() {
				var addTaskTest = taskInformation.addTaskData();
				var commentTaskTest = taskInformation.editTaskValues([ "" ], "not started", addTaskTest);
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"] + " commentTaskTest summary = "
						+ commentTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
				tasking_main_page.logOut();
				login_page.taskingLogin(username001, password001);
				tasking_main_page.addComment(commentTaskTest, commentTaskTest["existingCommentText"]);
				tasking_main_page.logOut();
				login_page.taskingLogin(username001, password001);
				tasking_main_page.checkComment(commentTaskTest);
			});

		});

		xdescribe('block & cancel tests', function() {
			it('block task', function() {
				var addTaskTest = taskInformation.addTaskData();
				var blockTaskTest = taskInformation.editTaskValues([ "" ], "blocked", addTaskTest);
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
			it('cancel task', function() {
				var addTaskTest = addTaskData();
				var cancelTaskTest = taskInformation.editTaskValues([ "" ], "canceled", addTaskTest);
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
		});

		xdescribe('add task status tests', function() {
			it('change task status in progress', function() {
				var addTaskTest = addTaskData();
				var changeStatusTaskTest = taskInformation.editTaskValues([ "" ], "in progress", addTaskTest);
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
				var completeTaskTest = taskInformation.editTaskValues([ "" ], "complete", addTaskTest);
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
		xdescribe('add task all filters tests', function() {
			it('All filters Location happy', function() {
				var addTaskTest = taskInformation.addTaskData();
				var allFilterMenus = [ "allFilterLocation" ];
				var allFilterSelections = [ addTaskTest["addTasklocation"] ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			it('All filters Location Search happy', function() {
				var addTaskTest = taskInformation.addTaskData();
				var allFilterMenus = [ "allFilterLocation" ];
				var allFilterSelections = [ addTaskTest["addTasklocation"] ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFiltersSearch(allFilterMenus, allFilterSelections, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters Due happy', function() {
				var addTaskTest = taskInformation.addTaskData();
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilterDueDate(days, days);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			it('All filters Labels happy:  one label', function() {
				var addTaskTest = taskInformation.addTaskData();
				var labels = addTaskTest["labelEntry"];
				var allFilterMenus = [ "allFilterLabels" ];
				var allFilterSelections = [ labels[0] ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			it('All filters Labels search happy:  one label', function() {
				var addTaskTest = taskInformation.addTaskData();
				var labels = addTaskTest["labelEntry"];
				var allFilterMenus = [ "allFilterLabels" ];
				var allFilterSelections = [ labels[0] ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFiltersSearch(allFilterMenus, allFilterSelections, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			it('All filters Labels happy:  multiple labels', function() {
				var addTaskTest = taskInformation.addTaskData();
				var labels = addTaskTest["labelEntry"];
				var allFilterMenus = [ "allFilterLabels", "allFilterLabels", "allFilterLabels", "allFilterLabels" ];
				var allFilterSelections = [ labels[0], labels[1], labels[2], labels[3] ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			it('All filters Assignee happy', function() {
				var addTaskTest = taskInformation.addTaskData();
				var allFilterMenus = [ "allFilterAssignee" ];
				var allFilterSelections = [ "testuid1" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			it('All filters status happy :  in progress', function() {
				var addTaskTest = taskInformation.addTaskData();
				var changeStatusTaskTest = taskInformation.editTaskValues([ "" ], "in progress", addTaskTest);
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
			it('All filters status :  in progress', function() {
				var addTaskTest = taskInformation.addTaskData();
				var changeStatusTaskTest = taskInformation.editTaskValues([ "" ], "in progress", addTaskTest);
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
			it('All filters more options starred happy', function() {
				var addTaskTest = taskInformation.addTaskData();
				var allFilterMenus = [ "allFilterMoreO" ];
				var allFilterSelections = [ "Tasks I Starred" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.starTaskInQueue(addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			it('All filters more options blocked happy', function() {
				var addTaskTest = taskInformation.addTaskData();
				var allFilterMenus = [ "allFilterMoreO" ];
				var allFilterSelections = [ "Blocked Tasks" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.blockTask(addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			it('All filters more options i created happy', function() {
				var addTaskTest = taskInformation.addTaskData();
				var allFilterMenus = [ "allFilterMoreO" ];
				var allFilterSelections = [ "Tasks I Created" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			it('All filters more options i created', function() {
				var addTaskTest = taskInformation.addTaskData();
				var allFilterMenus = [ "allFilterMoreO" ];
				var allFilterSelections = [ "Tasks I Created" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.logOut();
				login_page.taskingLogin(username002, password002);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskNotInQueue(addTaskTest, "Open");
			});
			it('All filters multiple filters happy', function() {
				var addTaskTest = taskInformation.addTaskData();
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
			it('All filters clear filters', function() {
				var addTaskTest = taskInformation.addTaskData();
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
			it('All filters multiple filters count happy', function() {
				var addTaskTest = taskInformation.addTaskData();
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
