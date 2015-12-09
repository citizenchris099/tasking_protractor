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
var taskEntry = [ "summaryEntry", "addedDays", "assigneeEntry", "labelEntry",
		"descriptionEntry", "locationEntry" ]
var summary = phraseGen.randomPhrase();
var description = phraseGen.randomPhrase();
var label1 = phraseGen.randomLabel();
var label2 = phraseGen.randomLabel();
var label3 = phraseGen.randomLabel();
var label4 = phraseGen.randomLabel();
var location = phraseGen.randomLocation();
var user1 = "Test User";
var user2 = "Test User2";
var days = 3;

function taskData(summaryEntry, descriptionEntry, locationEntry, labelEntry,
		assigneeEntry, addedDays) {
	this.summaryEntry = summaryEntry;
	this.descriptionEntry = descriptionEntry;
	this.locationEntry = locationEntry;
	this.labelEntry = labelEntry;
	this.assigneeEntry = assigneeEntry;
	this.addedDays = addedDays;
};

var addTaskTest = new taskData(summary, description, location, [ label1,
		label2, label3, label4 ], user1, days)

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

		it('add a location to a task', function() {
			tasking_main_page.addTask(taskEntry, addTaskTest);
			tasking_main_page.checkTaskInQueuePresent(addTaskTest["summaryEntry"]);
		});
	});

	describe('failed login tests', function() {
		beforeEach(function() {
			login_page.isLoginPageLoaded();
		});

		afterEach(function() {
			login_page.isLoginPageLoaded();
		});

		it('add a location to a task', function() {
			login_page.taskingLoginFail("wrong", password001, uNameError);
		});

		it('add a location to a task', function() {
			login_page.taskingLoginFail(username001, "bad", pWordError);
		});
	});

});
