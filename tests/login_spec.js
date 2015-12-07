var login_page = require('../pages/login_page.js').login_page;
var tasking_main_page = require('../pages/tasking_main_page.js').tasking_main_page;
var localTasking = 'http://localhost:3000/';
var publicTasking = 'http://tasking.scienergydev.com/'
var username001 = 'testusername';
var password001 = 'testpassword';
var username002 = 'testusername2';
var password002 = 'testpassword2';
var uNameError = "User not found";
var pWordError = "Incorrect password";
var addTask = [ "location" ];
var taskEntry = [ "locationEntry" ]

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
			browser.driver.sleep(1000);
			tasking_main_page.revealAddTaskForm();
			browser.driver.sleep(1000);
			tasking_main_page.addTask(addTask, taskEntry);
			browser.driver.sleep(1000);
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
