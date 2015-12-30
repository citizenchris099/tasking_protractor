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
var task010ObjClone = taskInformation.task010Clone();
var task011Obj = taskInformation.task011();
var task012Obj = taskInformation.task012();
var task013Obj = taskInformation.task013();
var task014Obj = taskInformation.task014();
var task015Obj = taskInformation.task015();

var testObj = [ task001Obj, task002Obj, task003Obj, task004Obj, task005Obj, task006Obj, task007Obj, task008Obj, task009Obj,
		task010Obj, task011Obj, task012Obj, task013Obj, task014Obj, task015Obj ]

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

var testEntry = [ task001Entry, task002Entry, task003Entry, task004Entry, task005Entry, task006Entry, task007Entry,
		task008Entry, task009Entry, task010Entry, task011Entry, task012Entry, task013Entry, task014Entry, task015Entry ]

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
		afterEach(function() {
			tasking_main_page.logOut();
			login_page.isLoginPageLoaded();
		});

		xdescribe('task detail validation', function() {
			beforeEach(function() {
				login_page.isLoginPageLoaded();
				login_page.taskingLogin(username001, password001);
				tasking_main_page.isMainPageLoaded();
			});

			function task_detail_validation(obj, entry, queue) {
				it('fixture data task detail verification', function() {
					tasking_main_page.checkTaskInQueue(obj, queue);
					tasking_main_page.checkTaskDetails(entry, obj);
				});
			}

			for (var count = 0; count < testEntry.length; count++) {
				if (testObj[count] == task006Obj || testObj[count] == task007Obj) {
					task_detail_validation(testObj[count], testEntry[count], "Closed")
				} else {
					task_detail_validation(testObj[count], testEntry[count], "Open")
				}

			}

			it('comment check: task010 first comment verification', function() {
				tasking_main_page.checkComment(0, task010Obj);
			});

			it('comment check:  task010 second comment verification', function() {
				tasking_main_page.checkComment(1, task010ObjClone);
			});

		});

		xdescribe('task queue validation', function() {
			beforeEach(function() {
				login_page.isLoginPageLoaded();
				login_page.taskingLogin(username001, password001);
				tasking_main_page.isMainPageLoaded();
			});
			function task_status_validation(obj, queue) {
				it('fixture data task status verification', function() {
					tasking_main_page.checkTaskInQueue(obj, queue);
					tasking_main_page.checkTaskStatus(obj);
				});
			}
			function task_flag_validation(obj, queue) {
				it('fixture data task status verification', function() {
					tasking_main_page.checkTaskInQueue(obj, queue);
					tasking_main_page.checkTaskFlag(obj, true);
				});
			}
			describe('status validation', function() {
				for (var count = 0; count < testObj.length; count++) {
					if (testObj[count] == task006Obj || testObj[count] == task007Obj) {
						task_flag_validation(testObj[count], "Closed")
					} else {
						task_status_validation(testObj[count], "Open")
					}
				}
			});

			describe('task flag validation', function() {
				xit('fixture data task005 blocked flag verification', function() {
					tasking_main_page.checkTaskInQueue(task005Obj, "Open");
					tasking_main_page.checkTaskFlag(task005Obj, true);
				});

				xit('comment check: task010 comment flag verification', function() {
					tasking_main_page.checkTaskInQueue(task010Obj, "Open");
					tasking_main_page.checkTaskCommentFlags(task010Obj, 2, true);
				});

				it('fixture data task002 over due flag verification', function() {
					tasking_main_page.checkTaskInQueue(task002Obj, "Open");
					tasking_main_page.checkTaskOverDueFlags(task002Obj, "a day", true);
				});

				it('fixture data task013 over due flag verification', function() {
					tasking_main_page.checkTaskInQueue(task013Obj, "Open");
					tasking_main_page.checkTaskOverDueFlags(task013Obj, "2 days", true);
				});

				it('fixture data task014 over due flag verification', function() {
					tasking_main_page.checkTaskInQueue(task014Obj, "Open");
					tasking_main_page.checkTaskOverDueFlags(task014Obj, "7 days", true);
				});

				it('fixture data task015 over due flag verification', function() {
					tasking_main_page.checkTaskInQueue(task015Obj, "Open");
					tasking_main_page.checkTaskOverDueFlags(task015Obj, "a month", true);
				});
			});

		});
		describe('filter validation > ', function() {
			xdescribe('search filter validation > ', function() {
				beforeEach(function() {
					login_page.isLoginPageLoaded();
					login_page.taskingLogin(username001, password001);
					tasking_main_page.isMainPageLoaded();
				});
				function task_in_queue_search_validation(obj, obj2, queue, search) {
					it('fixture data search filter task present validation', function() {
						tasking_main_page.checkTaskInQueue(obj, queue);
						tasking_main_page.checkTaskInQueue(obj2, "Open");
						tasking_main_page.useSearchFilter(obj2, obj2[search]);
					});
				}
				function task_not_in_queue_search_validation(obj, obj2, queue, search) {
					it('fixture data search filter task not present validation', function() {
						tasking_main_page.checkTaskInQueue(obj, queue);
						tasking_main_page.checkTaskInQueue(obj2, "Open");
						tasking_main_page.useSearchFilter(obj2, obj2[search]);
						tasking_main_page.checkTaskNotInQueue(obj, queue);
					});
				}
				describe('search filter validation:  summary', function() {
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task006Obj || testObj[count] == task007Obj) {
							task_not_in_queue_search_validation(testObj[count], task001Obj, "Closed", "addTaskSummary")
						} else if (testObj[count] == task001Obj) {
							task_in_queue_search_validation(testObj[count], task001Obj, "Open", "addTaskSummary")
						} else {
							task_not_in_queue_search_validation(testObj[count], task001Obj, "Open", "addTaskSummary")
						}
					}
				});
				describe('search filter validation:  description', function() {
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task006Obj || testObj[count] == task007Obj) {
							task_not_in_queue_search_validation(testObj[count], task009Obj, "Closed", "addTaskDescription")
						} else if (testObj[count] == task009Obj || testObj[count] == task004Obj) {
							task_in_queue_search_validation(testObj[count], task009Obj, "Open", "addTaskDescription")
						} else {
							task_not_in_queue_search_validation(testObj[count], task009Obj, "Open", "addTaskDescription")
						}
					}
					it('search filter task004 & task009: description ', function() {
						tasking_main_page.checkTaskInQueue(task004Obj, "Open");
						tasking_main_page.checkTaskInQueue(task009Obj, "Open");
						tasking_main_page.useSearchFilter(task009Obj, task009Obj["addTaskDescription"]);
						tasking_main_page.checkTaskInQueue(task004Obj, "Open");
					});
				});
				describe('search filter validation:  location', function() {
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task006Obj || testObj[count] == task007Obj) {
							task_not_in_queue_search_validation(testObj[count], task009Obj, "Closed", "addTasklocation")
						} else if (testObj[count] == task009Obj || testObj[count] == task004Obj) {
							task_in_queue_search_validation(testObj[count], task009Obj, "Open", "addTasklocation")
						} else {
							task_not_in_queue_search_validation(testObj[count], task009Obj, "Open", "addTasklocation")
						}
					}
					it('search filter task004 & task009:  location ', function() {
						tasking_main_page.checkTaskInQueue(task004Obj, "Open");
						tasking_main_page.checkTaskInQueue(task009Obj, "Open");
						tasking_main_page.useSearchFilter(task009Obj, task009Obj["addTasklocation"]);
						tasking_main_page.checkTaskInQueue(task004Obj, "Open");
					});
				});
				describe('search filter validation:  label', function() {
					var labelSearch = task004Obj["labelEntry"]
					function task_in_queue_search_validation(obj, queue) {
						it('fixture data search filter task present validation', function() {
							tasking_main_page.checkTaskInQueue(obj, queue);
							tasking_main_page.checkTaskInQueue(task004Obj, "Open");
							tasking_main_page.useSearchFilter(task004Obj, labelSearch[0]);
						});
					}
					function task_not_in_queue_search_validation(obj, queue) {
						it('fixture data search filter task not present validation', function() {
							tasking_main_page.checkTaskInQueue(obj, queue);
							tasking_main_page.checkTaskInQueue(task004Obj, "Open");
							tasking_main_page.useSearchFilter(task004Obj, labelSearch[0]);
							tasking_main_page.checkTaskNotInQueue(obj, queue);
						});
					}
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task006Obj || testObj[count] == task007Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed")
						} else if (testObj[count] == task009Obj || testObj[count] == task004Obj
								|| testObj[count] == task008Obj) {
							task_in_queue_search_validation(testObj[count], "Open")
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open")
						}
					}
					it('search filter task004 & task009:  description ', function() {
						tasking_main_page.checkTaskInQueue(task004Obj, "Open");
						tasking_main_page.checkTaskInQueue(task009Obj, "Open");
						tasking_main_page.useSearchFilter(task009Obj, labelSearch[0]);
						tasking_main_page.checkTaskInQueue(task004Obj, "Open");
						tasking_main_page.checkTaskInQueue(task008Obj, "Open");
					});
				});
			});
			xdescribe('my tasks quick filter validation', function() {
				function task_in_queue_search_validation(obj, queue) {
					it('fixture data search filter task present validation', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskInQueue(obj, queue);
					});
				}
				function task_not_in_queue_search_validation(obj, queue) {
					it('fixture data search filter task present validation', function() {
						tasking_main_page.myTasksFilter();
						tasking_main_page.checkTaskNotInQueue(obj, queue);
					});
				}
				describe('my tasks quick filter validation:  test user1 > ', function() {
					beforeEach(function() {
						login_page.isLoginPageLoaded();
						login_page.taskingLogin(username001, password001);
						tasking_main_page.isMainPageLoaded();
					});
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task006Obj) {
							task_in_queue_search_validation(testObj[count], "Closed")
						} else if (testObj[count] == task003Obj || testObj[count] == task004Obj
								|| testObj[count] == task005Obj || testObj[count] == task009Obj
								|| testObj[count] == task010Obj || testObj[count] == task011Obj) {
							task_in_queue_search_validation(testObj[count], "Open")
						} else if (testObj[count] == task007Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed")
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open")
						}
					}
				});
				describe('my tasks quick filter validation:  test user2 > ', function() {
					beforeEach(function() {
						login_page.isLoginPageLoaded();
						login_page.taskingLogin(username002, password002);
						tasking_main_page.isMainPageLoaded();
					});
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task007Obj) {
							task_in_queue_search_validation(testObj[count], "Closed")
						} else if (testObj[count] == task001Obj || testObj[count] == task002Obj
								|| testObj[count] == task008Obj || testObj[count] == task012Obj
								|| testObj[count] == task013Obj || testObj[count] == task014Obj
								|| testObj[count] == task015Obj) {
							task_in_queue_search_validation(testObj[count], "Open")
						} else if (testObj[count] == task006Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed")
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open")
						}
					}
				});
			});
			xdescribe('tasks I created quick filter validation > ', function() {
				function task_in_queue_search_validation(obj, queue) {
					it('fixture data search filter task present validation', function() {
						tasking_main_page.tasksICreatedQuickFilter();
						tasking_main_page.checkTaskInQueue(obj, queue);
					});
				}
				function task_not_in_queue_search_validation(obj, queue) {
					it('fixture data search filter task present validation', function() {
						tasking_main_page.tasksICreatedQuickFilter();
						tasking_main_page.checkTaskNotInQueue(obj, queue);
					});
				}
				describe('tasks I created quick filter validation:  test user 1 > ', function() {
					beforeEach(function() {
						login_page.isLoginPageLoaded();
						login_page.taskingLogin(username001, password001);
						tasking_main_page.isMainPageLoaded();
					});
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
							task_in_queue_search_validation(testObj[count], "Closed")
						} else if (testObj[count] == task001Obj || testObj[count] == task004Obj
								|| testObj[count] == task005Obj || testObj[count] == task009Obj
								|| testObj[count] == task011Obj) {
							task_in_queue_search_validation(testObj[count], "Open")
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open")
						}
					}
				});
				describe('tasks I created quick filter validation:  test user 2 > ', function() {
					beforeEach(function() {
						login_page.isLoginPageLoaded();
						login_page.taskingLogin(username002, password002);
						tasking_main_page.isMainPageLoaded();
					});
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed")
						} else if (testObj[count] == task002Obj || testObj[count] == task003Obj
								|| testObj[count] == task008Obj || testObj[count] == task012Obj
								|| testObj[count] == task013Obj || testObj[count] == task014Obj
								|| testObj[count] == task015Obj || testObj[count] == task010Obj) {
							task_in_queue_search_validation(testObj[count], "Open")
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open")
						}
					}
				});
			});
			xdescribe('tasks I starred quick filter validation > ', function() {
				function task_in_queue_search_validation(obj, queue) {
					it('fixture data search filter task present validation > ', function() {
						tasking_main_page.tasksIStarredQuickFilter();
						tasking_main_page.checkTaskInQueue(obj, queue);
					});
				}
				function task_not_in_queue_search_validation(obj, queue) {
					it('fixture data search filter task present validation > ', function() {
						tasking_main_page.tasksIStarredQuickFilter();
						tasking_main_page.checkTaskNotInQueue(obj, queue);
					});
				}
				describe('tasks I starred quick filter validation:  test user 1', function() {
					beforeEach(function() {
						login_page.isLoginPageLoaded();
						login_page.taskingLogin(username001, password001);
						tasking_main_page.isMainPageLoaded();
					});
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed")
						} else if (testObj[count] == task004Obj || testObj[count] == task010Obj) {
							task_in_queue_search_validation(testObj[count], "Open")
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open")
						}
					}
				});
				describe('tasks I starred quick filter validation:  test user 2', function() {
					beforeEach(function() {
						login_page.isLoginPageLoaded();
						login_page.taskingLogin(username002, password002);
						tasking_main_page.isMainPageLoaded();
					});
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed")
						} else if (testObj[count] == task009Obj || testObj[count] == task010Obj) {
							task_in_queue_search_validation(testObj[count], "Open")
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open")
						}
					}
				});
			});

			xdescribe('blocked tasks quick filter validation', function() {
				function task_in_queue_search_validation(obj, queue) {
					it('fixture data search filter task present validation > ', function() {
						tasking_main_page.blockedTasksQuickFilter();
						tasking_main_page.checkTaskInQueue(obj, queue);
					});
				}
				function task_not_in_queue_search_validation(obj, queue) {
					it('fixture data search filter task present validation > ', function() {
						tasking_main_page.blockedTasksQuickFilter();
						tasking_main_page.checkTaskNotInQueue(obj, queue);
					});
				}
				beforeEach(function() {
					login_page.isLoginPageLoaded();
					login_page.taskingLogin(username001, password001);
					tasking_main_page.isMainPageLoaded();
				});
				for (var count = 0; count < testObj.length; count++) {
					if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
						task_not_in_queue_search_validation(testObj[count], "Closed")
					} else if (testObj[count] == task005Obj) {
						task_in_queue_search_validation(testObj[count], "Open")
					} else {
						task_not_in_queue_search_validation(testObj[count], "Open")
					}
				}
			});

			xdescribe('all filters location validation', function() {
				var allFilterMenus = [ "allFilterLocation" ];
				function task_in_queue_search_validation(obj, queue, selection) {
					it('fixture data search filter task present validation > ', function() {
						tasking_main_page.useAllFilters(allFilterMenus, selection);
						tasking_main_page.checkTaskInQueue(obj, queue);
					});
				}
				function task_not_in_queue_search_validation(obj, queue, selection) {
					it('fixture data search filter task present validation > ', function() {
						tasking_main_page.useAllFilters(allFilterMenus, selection);
						tasking_main_page.checkTaskNotInQueue(obj, queue);
					});
				}
				beforeEach(function() {
					login_page.isLoginPageLoaded();
					login_page.taskingLogin(username001, password001);
					tasking_main_page.isMainPageLoaded();
				});
				describe('all filters location validation:  location 1', function() {
					var allFilterSelections = [ "location 1" ];
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
						} else if (testObj[count] == task004Obj || testObj[count] == task009Obj) {
							task_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						}
					}
				});
				describe('all filters location validation:  location 2', function() {
					var allFilterSelections = [ "location 2" ];
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
						} else if (testObj[count] == task008Obj || testObj[count] == task010Obj) {
							task_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						}
					}
				});

			});

			xdescribe('all filters label validation > ', function() {
				function task_in_queue_search_validation(obj, queue, menu, selection) {
					it('fixture data search filter task present validation > ', function() {
						tasking_main_page.useAllFilters(menu, selection);
						tasking_main_page.checkTaskInQueue(obj, queue);
					});
				}
				function task_not_in_queue_search_validation(obj, queue, menu, selection) {
					it('fixture data search filter task present validation > ', function() {
						tasking_main_page.useAllFilters(menu, selection);
						tasking_main_page.checkTaskNotInQueue(obj, queue);
					});
				}
				beforeEach(function() {
					login_page.isLoginPageLoaded();
					login_page.taskingLogin(username001, password001);
					tasking_main_page.isMainPageLoaded();
				});
				describe('all filters single label validation > ', function() {
					var allFilterMenus = [ "allFilterLabels" ];
					describe('all filters label validation:  label 1 > ', function() {
						var allFilterSelections = [ "label 1" ];
						for (var count = 0; count < testObj.length; count++) {
							if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
								task_not_in_queue_search_validation(testObj[count], "Closed", allFilterMenus,
										allFilterSelections)
							} else if (testObj[count] == task004Obj || testObj[count] == task008Obj
									|| testObj[count] == task009Obj) {
								task_in_queue_search_validation(testObj[count], "Open", allFilterMenus, allFilterSelections)
							} else {
								task_not_in_queue_search_validation(testObj[count], "Open", allFilterMenus,
										allFilterSelections)
							}
						}
					});
					describe('all filters label validation:  label 2 > ', function() {
						var allFilterSelections = [ "label 2" ];
						for (var count = 0; count < testObj.length; count++) {
							if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
								task_not_in_queue_search_validation(testObj[count], "Closed", allFilterMenus,
										allFilterSelections)
							} else if (testObj[count] == task004Obj || testObj[count] == task010Obj) {
								task_in_queue_search_validation(testObj[count], "Open", allFilterMenus, allFilterSelections)
							} else {
								task_not_in_queue_search_validation(testObj[count], "Open", allFilterMenus,
										allFilterSelections)
							}
						}
					});
					describe('all filters label validation:  label 3 > ', function() {
						var allFilterSelections = [ "label 3" ];
						for (var count = 0; count < testObj.length; count++) {
							if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
								task_not_in_queue_search_validation(testObj[count], "Closed", allFilterMenus,
										allFilterSelections)
							} else if (testObj[count] == task003Obj || testObj[count] == task008Obj) {
								task_in_queue_search_validation(testObj[count], "Open", allFilterMenus, allFilterSelections)
							} else {
								task_not_in_queue_search_validation(testObj[count], "Open", allFilterMenus,
										allFilterSelections)
							}
						}
					});
					describe('all filters label validation:  label 4 > ', function() {
						var allFilterSelections = [ "label 4" ];
						for (var count = 0; count < testObj.length; count++) {
							if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
								task_not_in_queue_search_validation(testObj[count], "Closed", allFilterMenus,
										allFilterSelections)
							} else if (testObj[count] == task003Obj || testObj[count] == task009Obj
									|| testObj[count] == task010Obj) {
								task_in_queue_search_validation(testObj[count], "Open", allFilterMenus, allFilterSelections)
							} else {
								task_not_in_queue_search_validation(testObj[count], "Open", allFilterMenus,
										allFilterSelections)
							}
						}
					});
				});
				describe('all filters multi label validation > ', function() {
					var allFilterMenus = [ "allFilterLabels", "allFilterLabels" ];
					describe('all filters label validation:  label 1 & label 2 > ', function() {
						var allFilterSelections = [ "label 1", "label 2" ];
						for (var count = 0; count < testObj.length; count++) {
							if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
								task_not_in_queue_search_validation(testObj[count], "Closed", allFilterMenus,
										allFilterSelections)
							} else if (testObj[count] == task004Obj || testObj[count] == task009Obj
									|| testObj[count] == task010Obj || testObj[count] == task008Obj) {
								task_in_queue_search_validation(testObj[count], "Open", allFilterMenus, allFilterSelections)
							} else {
								task_not_in_queue_search_validation(testObj[count], "Open", allFilterMenus,
										allFilterSelections)
							}
						}
					});
					describe('all filters label validation:  label 1 & label 3 > ', function() {
						var allFilterSelections = [ "label 1", "label 3" ];
						for (var count = 0; count < testObj.length; count++) {
							if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
								task_not_in_queue_search_validation(testObj[count], "Closed", allFilterMenus,
										allFilterSelections)
							} else if (testObj[count] == task004Obj || testObj[count] == task009Obj
									|| testObj[count] == task003Obj || testObj[count] == task008Obj) {
								task_in_queue_search_validation(testObj[count], "Open", allFilterMenus, allFilterSelections)
							} else {
								task_not_in_queue_search_validation(testObj[count], "Open", allFilterMenus,
										allFilterSelections)
							}
						}
					});
					describe('all filters label validation:  label 1 & label 4 > ', function() {
						var allFilterSelections = [ "label 1", "label 4" ];
						for (var count = 0; count < testObj.length; count++) {
							if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
								task_not_in_queue_search_validation(testObj[count], "Closed", allFilterMenus,
										allFilterSelections)
							} else if (testObj[count] == task004Obj || testObj[count] == task009Obj
									|| testObj[count] == task003Obj || testObj[count] == task008Obj
									|| testObj[count] == task010Obj) {
								task_in_queue_search_validation(testObj[count], "Open", allFilterMenus, allFilterSelections)
							} else {
								task_not_in_queue_search_validation(testObj[count], "Open", allFilterMenus,
										allFilterSelections)
							}
						}
					});
					describe('all filters label validation:  label 2 & label 3 > ', function() {
						var allFilterSelections = [ "label 2", "label 3" ];
						for (var count = 0; count < testObj.length; count++) {
							if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
								task_not_in_queue_search_validation(testObj[count], "Closed", allFilterMenus,
										allFilterSelections)
							} else if (testObj[count] == task004Obj || testObj[count] == task003Obj
									|| testObj[count] == task008Obj || testObj[count] == task010Obj) {
								task_in_queue_search_validation(testObj[count], "Open", allFilterMenus, allFilterSelections)
							} else {
								task_not_in_queue_search_validation(testObj[count], "Open", allFilterMenus,
										allFilterSelections)
							}
						}
					});
					describe('all filters label validation:  label 2 & label 4 > ', function() {
						var allFilterSelections = [ "label 2", "label 4" ];
						for (var count = 0; count < testObj.length; count++) {
							if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
								task_not_in_queue_search_validation(testObj[count], "Closed", allFilterMenus,
										allFilterSelections)
							} else if (testObj[count] == task004Obj || testObj[count] == task003Obj
									|| testObj[count] == task009Obj || testObj[count] == task010Obj) {
								task_in_queue_search_validation(testObj[count], "Open", allFilterMenus, allFilterSelections)
							} else {
								task_not_in_queue_search_validation(testObj[count], "Open", allFilterMenus,
										allFilterSelections)
							}
						}
					});
					describe('all filters label validation:  label 3 & label 4 > ', function() {
						var allFilterSelections = [ "label 3", "label 4" ];
						for (var count = 0; count < testObj.length; count++) {
							if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
								task_not_in_queue_search_validation(testObj[count], "Closed", allFilterMenus,
										allFilterSelections)
							} else if (testObj[count] == task008Obj || testObj[count] == task003Obj
									|| testObj[count] == task009Obj || testObj[count] == task010Obj) {
								task_in_queue_search_validation(testObj[count], "Open", allFilterMenus, allFilterSelections)
							} else {
								task_not_in_queue_search_validation(testObj[count], "Open", allFilterMenus,
										allFilterSelections)
							}
						}
					});
				});
			});
			xdescribe('all filters assignee validation', function() {
				var allFilterMenus = [ "allFilterAssignee" ];
				function task_in_queue_search_validation(obj, queue, selection) {
					it('fixture data search filter task present validation > ', function() {
						tasking_main_page.useAllFilters(allFilterMenus, selection);
						tasking_main_page.checkTaskInQueue(obj, queue);
					});
				}
				function task_not_in_queue_search_validation(obj, queue, selection) {
					it('fixture data search filter task present validation > ', function() {
						tasking_main_page.useAllFilters(allFilterMenus, selection);
						tasking_main_page.checkTaskNotInQueue(obj, queue);
					});
				}
				beforeEach(function() {
					login_page.isLoginPageLoaded();
					login_page.taskingLogin(username001, password001);
					tasking_main_page.isMainPageLoaded();
				});
				describe('all filters assignee validation: test user 1', function() {
					var allFilterSelections = [ "testuid1" ];
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task007Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
						} else if (testObj[count] == task003Obj || testObj[count] == task004Obj
								|| testObj[count] == task005Obj || testObj[count] == task009Obj
								|| testObj[count] == task010Obj || testObj[count] == task011Obj) {
							task_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						} else if (testObj[count] == task006Obj) {
							task_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						}
					}
				});
				describe('all filters assignee validation: test user 2', function() {
					var allFilterSelections = [ "testuid2" ];
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task006Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
						} else if (testObj[count] == task001Obj || testObj[count] == task002Obj
								|| testObj[count] == task008Obj || testObj[count] == task012Obj
								|| testObj[count] == task013Obj || testObj[count] == task014Obj
								|| testObj[count] == task015Obj) {
							task_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						} else if (testObj[count] == task007Obj) {
							task_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						}
					}
				});
			});
			xdescribe('all filters status validation > ', function() {
				var allFilterMenus = [ "allFilterStatus" ];
				function task_in_queue_search_validation(obj, queue, selection) {
					it('fixture data search filter task present validation > ', function() {
						tasking_main_page.useAllFilters(allFilterMenus, selection);
						tasking_main_page.checkTaskInQueue(obj, queue);
					});
				}
				function task_not_in_queue_search_validation(obj, queue, selection) {
					it('fixture data search filter task present validation > ', function() {
						tasking_main_page.useAllFilters(allFilterMenus, selection);
						tasking_main_page.checkTaskNotInQueue(obj, queue);
					});
				}
				beforeEach(function() {
					login_page.isLoginPageLoaded();
					login_page.taskingLogin(username001, password001);
					tasking_main_page.isMainPageLoaded();
				});
				describe('all filters status validation: not started', function() {
					var allFilterSelections = [ "Not Started" ];
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
						} else if (testObj[count] == task011Obj) {
							task_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
							task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						}
					}
				});
				describe('all filters status validation: in progress', function() {
					var allFilterSelections = [ "In Progress" ];
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
						} else if (testObj[count] == task002Obj || testObj[count] == task003Obj
								|| testObj[count] == task004Obj || testObj[count] == task005Obj
								|| testObj[count] == task008Obj || testObj[count] == task009Obj
								|| testObj[count] == task010Obj || testObj[count] == task012Obj
								|| testObj[count] == task013Obj || testObj[count] == task014Obj
								|| testObj[count] == task015Obj) {
							task_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
							task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						}
					}
				});
				describe('all filters status validation: on hold', function() {
					var allFilterSelections = [ "On Hold" ];
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
						} else if (testObj[count] == task001Obj) {
							task_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
							task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						}
					}
				});
				describe('all filters status validation: complete', function() {
					var allFilterSelections = [ "Complete" ];
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task006Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
						} else if (testObj[count] == task007Obj) {
							task_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
							task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						}
					}
				});
				describe('all filters status validation: canceled', function() {
					var allFilterSelections = [ "Canceled" ];
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task007Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
						} else if (testObj[count] == task006Obj) {
							task_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
							task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						}
					}
				});
			});
			xdescribe('all filters more options validation > ', function() {
				var allFilterMenus = [ "allFilterMoreO" ];
				function task_in_queue_search_validation(obj, queue, selection) {
					it('fixture data search filter task present validation > ', function() {
						tasking_main_page.useAllFilters(allFilterMenus, selection);
						tasking_main_page.checkTaskInQueue(obj, queue);
					});
				}
				function task_not_in_queue_search_validation(obj, queue, selection) {
					it('fixture data search filter task present validation > ', function() {
						tasking_main_page.useAllFilters(allFilterMenus, selection);
						tasking_main_page.checkTaskNotInQueue(obj, queue);
					});
				}
				describe('all filters more options validation:  starred > ', function() {
					var allFilterSelections = [ "Tasks I Starred" ];
					describe('all filters more options validation:  starred by test user 1 > ', function() {
						beforeEach(function() {
							login_page.isLoginPageLoaded();
							login_page.taskingLogin(username001, password001);
							tasking_main_page.isMainPageLoaded();
						});
						for (var count = 0; count < testObj.length; count++) {
							if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
								task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
							} else if (testObj[count] == task004Obj || testObj[count] == task009Obj) {
								task_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
							} else {
								task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
							}
						}
					});
					describe('all filters more options validation:  starred by test user 2 > ', function() {
						beforeEach(function() {
							login_page.isLoginPageLoaded();
							login_page.taskingLogin(username002, password002);
							tasking_main_page.isMainPageLoaded();
						});
						for (var count = 0; count < testObj.length; count++) {
							if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
								task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
							} else if (testObj[count] == task009Obj || testObj[count] == task010Obj) {
								task_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
							} else {
								task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
							}
						}
					});
				});
				describe('all filters more options validation: i created > ', function() {
					var allFilterSelections = [ "Tasks I Created" ];
					describe('all filters more options validation: created by test user 1 > ', function() {
						beforeEach(function() {
							login_page.isLoginPageLoaded();
							login_page.taskingLogin(username001, password001);
							tasking_main_page.isMainPageLoaded();
						});
						for (var count = 0; count < testObj.length; count++) {
							if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
								task_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
							} else if (testObj[count] == task001Obj || testObj[count] == task004Obj
									|| testObj[count] == task005Obj || testObj[count] == task009Obj
									|| testObj[count] == task011Obj) {
								task_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
							} else {
								task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
							}
						}
					});
					describe('all filters more options validation:  created by test user 2 > ', function() {
						beforeEach(function() {
							login_page.isLoginPageLoaded();
							login_page.taskingLogin(username002, password002);
							tasking_main_page.isMainPageLoaded();
						});
						for (var count = 0; count < testObj.length; count++) {
							if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
								task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
							} else if (testObj[count] == task002Obj || testObj[count] == task003Obj
									|| testObj[count] == task008Obj || testObj[count] == task012Obj
									|| testObj[count] == task013Obj || testObj[count] == task014Obj
									|| testObj[count] == task015Obj || testObj[count] == task010Obj) {
								task_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
							} else {
								task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
							}
						}
					});
				});

				describe('all filters more options validation: blocked > ', function() {
					var allFilterSelections = [ "Blocked Tasks" ];
					beforeEach(function() {
						login_page.isLoginPageLoaded();
						login_page.taskingLogin(username001, password001);
						tasking_main_page.isMainPageLoaded();
					});
					for (var count = 0; count < testObj.length; count++) {
						if (testObj[count] == task007Obj || testObj[count] == task006Obj) {
							task_not_in_queue_search_validation(testObj[count], "Closed", allFilterSelections)
						} else if (testObj[count] == task005Obj) {
							task_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						} else {
							task_not_in_queue_search_validation(testObj[count], "Open", allFilterSelections)
						}
					}
				});
			});
		});
		describe('edit task details tests > ', function() {
			beforeEach(function() {
				login_page.isLoginPageLoaded();
				login_page.taskingLogin(username001, password001);
				tasking_main_page.isMainPageLoaded();
			});
			describe('edit task details:  summary > ', function() {
				var summaryEdit = [ "taskDetailsSummary" ];
				var task001Edit = taskInformation.editTaskValues(taskEdit, "not started", task001Obj);
				it('summary edit original not visible in task queue', function() {
					tasking_main_page.checkTaskInQueue(task001Obj, "Open");
					tasking_main_page.editTaskDetails(summaryEdit, task001Obj, task001Edit);
					tasking_main_page.checkTaskNotInQueue(task001Obj, "Open");
				});
				it('summary edit visible in task queue', function() {
					tasking_main_page.checkTaskInQueue(task001Edit, "Open");
				});
				it('summary edit visible in task details', function() {
					tasking_main_page.checkTaskDetails(summaryEdit, task001Edit);

				});
				it('summary edit search using new summary', function() {
					tasking_main_page.useSearchFilter(task001Edit, task001Edit["addTaskSummary"]);
				});
				it('summary edit back to original state', function() {
					tasking_main_page.checkTaskInQueue(task001Edit, "Open");
					tasking_main_page.editTaskDetails(summaryEdit, task001Edit, task001Obj);
					tasking_main_page.checkTaskInQueue(task001Obj, "Open");

				});
				it('summary edit back to original state', function() {
					tasking_main_page.checkTaskDetails(summaryEdit, task001Obj);
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
			it('simple add task', function() {
				var addTaskTest = taskInformation.addTaskData();
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.logOut();
				login_page.taskingLogin(username001, password001);
				tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);
			});
			it('edit task details', function() {
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

			xit('add comment', function() {
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
				tasking_main_page.checkComment(0, commentTaskTest);
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
			xit('All filters Labels happy:  one label', function() {
				var addTaskTest = taskInformation.addTaskData();
				var labels = addTaskTest["labelEntry"];
				var allFilterMenus = [ "allFilterLabels" ];
				var allFilterSelections = [ labels[0] ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters Labels search happy:  one label', function() {
				var addTaskTest = taskInformation.addTaskData();
				var labels = addTaskTest["labelEntry"];
				var allFilterMenus = [ "allFilterLabels" ];
				var allFilterSelections = [ labels[0] ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFiltersSearch(allFilterMenus, allFilterSelections, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters Labels happy:  multiple labels', function() {
				var addTaskTest = taskInformation.addTaskData();
				var labels = addTaskTest["labelEntry"];
				var allFilterMenus = [ "allFilterLabels", "allFilterLabels", "allFilterLabels", "allFilterLabels" ];
				var allFilterSelections = [ labels[0], labels[1], labels[2], labels[3] ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters Assignee happy', function() {
				var addTaskTest = taskInformation.addTaskData();
				var allFilterMenus = [ "allFilterAssignee" ];
				var allFilterSelections = [ "testuid1" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters status happy :  in progress', function() {
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
			xit('All filters status :  in progress', function() {
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
			xit('All filters more options starred happy', function() {
				var addTaskTest = taskInformation.addTaskData();
				var allFilterMenus = [ "allFilterMoreO" ];
				var allFilterSelections = [ "Tasks I Starred" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.starTaskInQueue(addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters more options blocked happy', function() {
				var addTaskTest = taskInformation.addTaskData();
				var allFilterMenus = [ "allFilterMoreO" ];
				var allFilterSelections = [ "Blocked Tasks" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.blockTask(addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters more options i created happy', function() {
				var addTaskTest = taskInformation.addTaskData();
				var allFilterMenus = [ "allFilterMoreO" ];
				var allFilterSelections = [ "Tasks I Created" ];
				console.log("addTaskTest summary = " + addTaskTest["addTaskSummary"]);
				tasking_main_page.addTask(taskEntry, addTaskTest);
				tasking_main_page.useAllFilters(allFilterMenus, allFilterSelections);
				tasking_main_page.checkTaskInQueue(addTaskTest, "Open");
			});
			xit('All filters more options i created', function() {
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
