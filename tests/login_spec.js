var login_page = require('../pages/login_page.js').login_page;
var tasking_main_page = require('../pages/tasking_main_page.js').tasking_main_page;
var phraseGen = require('../pages/phraseGen.js').phraseGen;
var localTasking = 'http://localhost:3000/';
var publicTasking = 'http://tasking.scienergydev.com/'
var username001 = 'testusername';
var password001 = 'testpassword';
var username002 = 'testusername2';
var password002 = 'testpassword2';
var uNameError = "User not found";
var pWordError = "Incorrect password";
var taskEntry = [ "addTaskSummary", "addTaskDescription", "addTasklocation",
		"labelEntry" ]
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
var daysEdit = 30;

function taskData(addTaskSummary, addTaskDescription, addTasklocation,
		labelEntry, addTaskAssignee, addedDays, displayDate) {
	this.addTaskSummary = addTaskSummary;
	this.addTaskDescription = addTaskDescription;
	this.addTasklocation = addTasklocation;
	this.labelEntry = labelEntry;
	this.addTaskAssignee = addTaskAssignee;
	this.addedDays = addedDays;
	this.displayDate = displayDate;
};

var addTaskTest = new taskData(summary, description, location, [ label1,
		label2, label3, label4 ], user1, days);

var editTaskTest = new taskData(summaryEdit, descriptionEdit, locationEdit, [
		label5, label6, label7, label8 ], user2, daysEdit);

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

		it('simple add task', function() {
			console.log("summary = " + summary);
			tasking_main_page.addTask(taskEntry, addTaskTest);
			tasking_main_page.checkTaskDetails(taskEntry, addTaskTest);

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
