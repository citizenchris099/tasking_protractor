// this is a practice file that automates a simple js site 'http://thetestroom.com/jswebapp/'

var localTasking = 'http://localhost:3000/';
var publicTasking = 'http://tasking.scienergydev.com/'
var pageTitle = 'WELCOME TO THE ZOO ADOPTION CENTER';
var name = 'Chris Manning';
var username001 = 'testusername';
var password001 = 'testpassword';
var username002 = 'testusername2';
var password002 = 'testpassword2';
var menuOptions = [ "Please select from the drop down below",
		"George the Turtle", "Simba the Lion", "Nemo the Fish" ];

/**
 * locators: log in page
 */
var userName = by.xpath("//input[@placeholder='Username']");
var passWord = by.xpath("//input[@placeholder='Password']");
var login = by.xpath("//input[@type='submit']");

/**
 * locators
 */
var searchBox = by.xpath("//input[@placeholder='Search']");
var loginName = by.xpath("//span[@class='avatar']");

/**
 * locators: add task
 */
var showAddTaskParent = by
		.xpath("//div[contains(@class,'taskquickaddtoggle')]");
var showAddTaskForm = by
		.xpath(".//i[contains(@class,'scicon-plus-circle-outline')]")
var addTaskParent = by.xpath("//div[contains(@class,'taskquickaddform')]");
var taskLocation = by
		.xpath(".//div[contains(@class,'Select-placeholder')] [.='Location']")

/**
 * used to check the text presen in an element.
 * 
 * @param element :
 *            protractor element to inspect
 * @param string :
 *            expected text
 */
function textCheck(element, string) {
	expect(element.getText()).toEqual(string);
}

function chkElementPresent(locator) {
	browser.driver.wait(function() {
		return browser.driver.isElementPresent(locator);
	});
}

function isLoaded(element1, element2) {
	chkElementPresent(element1);
	chkElementPresent(element2);
}

/**
 * logs into tasking
 * 
 * @param uName
 * @param pWord
 */
function taskingLogin(uName, pWord) {
	isLoaded(userName, passWord);
	element(userName).sendKeys(uName);
	element(passWord).sendKeys(pWord);
	element(login).click();
}

function revealAddTaskForm() {
	browser.driver.findElement(showAddTaskParent).findElement(showAddTaskForm)
			.click();
}

function enterLocation() {
	browser.driver.findElement(addTaskParent).findElement(taskLocation).click();
	browser.actions().sendKeys("hey now", protractor.Key.ENTER).perform();
}

describe('tasking test', function() {

	beforeEach(function() {
		browser.ignoreSynchronization = true;
		browser.driver.get(localTasking);
		browser.manage().timeouts().implicitlyWait(5000);
		browser.driver.manage().window().maximize();
	});

	it('main page load', function() {
		taskingLogin(username001, password001);
		isLoaded(searchBox, loginName);
		revealAddTaskForm();
		browser.driver.sleep(1000);
		enterLocation();
		browser.driver.sleep(3000);
	});
});
