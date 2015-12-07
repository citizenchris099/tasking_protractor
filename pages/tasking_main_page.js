var basePage = require('./page.js').page;

var locators = {};
locators.searchBox = by.xpath("//input[@placeholder='Search']");
locators.loginName = by.xpath("//span[@class='avatar']");
locators.logOut = by.xpath("//span[.='Log Out']");

/**
 * locators: add task
 */
locators.showAddTaskParent = by
		.xpath("//div[contains(@class,'taskquickaddtoggle')]");
locators.showAddTaskForm = by
		.xpath(".//i[contains(@class,'scicon-plus-circle-outline')]")
locators.addTaskParent = by.xpath("//div[contains(@class,'taskquickaddform')]");
locators.taskLocation = by
		.xpath(".//div[contains(@class,'Select-placeholder')] [.='Location']");

var locatorMap = new Map();
//var location = "location";
locatorMap.set("location", by
		.xpath(".//div[contains(@class,'Select-placeholder')] [.='Location']"));

var addTaskEntryMap = new Map();
var locationEntry = "locationEntry";
addTaskEntryMap.set(locationEntry, "Hey Now");

var tasking_main_page = function() {
};

tasking_main_page.prototype.isMainPageLoaded = function() {
	basePage.isLoaded(locators.searchBox, locators.loginName);
}

tasking_main_page.prototype.logOut = function() {
	element(locators.loginName).click();
	element(locators.logOut).click();
};

tasking_main_page.prototype.revealAddTaskForm = function() {
	basePage.findElement(locators.showAddTaskParent, locators.showAddTaskForm)
			.click();
};

tasking_main_page.prototype.enterLocation = function() {
	basePage.dynamicSendKeys(locators.addTaskParent, locators.taskLocation,
			"hey now");
};

tasking_main_page.prototype.addTask = function(value, value2) {
	for (count = 0; count < value.length; count++) {
		basePage.dynamicSendKeys(locators.addTaskParent, locatorMap
				.get(value[count]), addTaskEntryMap.get(value2[count]));
	}
};

exports.tasking_main_page = new tasking_main_page();