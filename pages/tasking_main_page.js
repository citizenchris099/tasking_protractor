var tasking_main_page = function() {
};
var basePage = require('./page.js').page;
var datePicker = require('./datePicker.js').datePicker;
var locatorMap = new Map();
locatorMap.set("searchBox", by.xpath("//input[@placeholder='Search']"));
locatorMap.set("loginName", by.xpath("//span[@class='avatar']"));
locatorMap.set("logOut", by.xpath("//span[.='Log Out']"));

/**
 * locators: add task
 */
locatorMap.set("showAddTaskParent", by
		.xpath("//div[contains(@class,'taskquickaddtoggle')]"));
locatorMap.set("showAddTaskForm", by
		.xpath(".//i[contains(@class,'scicon-plus-circle-outline')]"));
locatorMap.set("addTaskParent", by
		.xpath("//div[contains(@class,'taskquickaddform')]"));
locatorMap.set("addTaskSummary", by
		.xpath(".//textarea[contains(@class,'taskquickaddform-summary')]"));
locatorMap.set("addTaskDescription", by
		.xpath(".//textarea[contains(@class,'taskquickaddform-description')]"));
locatorMap.set("addTasklocation", by
		.xpath(".//div[contains(@class,'Select-placeholder')] [.='Location']"));
locatorMap.set("addTaskDueDate", by
		.xpath(".//input[contains(@placeholder,'Due')]"));
locatorMap.set("addTasklabels", by.xpath(".//div[.='Labels']"));
locatorMap.set("addTaskAssignee", by.xpath(".//div[.='Assignee']"));
locatorMap.set("addTaskCreate", by.xpath("//button[.='Create']"));

/**
 * locators: task queue
 */
locatorMap
		.set("taskListParent", by.xpath("//div[@class='taskqueue-tasklist']"));
locatorMap.set("moreTaskButton", by.xpath(".//button[.='More Tasks']"));

var revealAddTaskForm = function() {
	basePage.findElement(locatorMap.get("showAddTaskParent"),
			locatorMap.get("showAddTaskForm")).click();
};

var clickDatePicker = function(parent) {
	basePage.findElement(locatorMap.get(parent),
			locatorMap.get("addTaskDueDate")).click();
};

var taskInQueue = function(value) {
	return by.xpath(".//span[contains(text(), '" + value
			+ "')] [@class='js-taskqueue-task-summary']");
};

var clickMoreTasks = function() {
	var moreTask = element(locatorMap.get("taskListParent")).element(
			locatorMap.get("moreTaskButton"));
	moreTask.isDisplayed().then(function() {
		moreTask.click();
		checkTaskDisplayed();
	}, function(err) {
		throw err;
	})
};

var checkTaskDisplayed = function(value) {
	var task = element(locatorMap.get("taskListParent")).element(
			taskInQueue(value));
	task.isDisplayed().then(function() {
		task.click();
	}, function(err) {
		clickMoreTasks();
	});
}

tasking_main_page.prototype.isMainPageLoaded = function() {
	basePage.isLoaded(locatorMap.get("searchBox"), locatorMap.get("loginName"));
};

tasking_main_page.prototype.logOut = function() {
	element(locatorMap.get("loginName")).click();
	element(locatorMap.get("logOut")).click();
};

tasking_main_page.prototype.addTask = function(value2, obj) {
	revealAddTaskForm();
	for (var count = 0; count < value2.length; count++) {
		if (value2[count] == "labelEntry") {
			browser.driver.sleep(1000);
			basePage.dynamicSendKeysLoop(locatorMap.get("addTaskParent"),
					locatorMap.get("addTasklabels"), obj[value2[count]]);
		} else if (value2[count] == "addedDays") {
			clickDatePicker("addTaskParent");
			datePicker.useDatePicker(obj[value2[count]]);
		} else if (value2[count] == "summaryEntry") {
			basePage.dynamicSendKeys(locatorMap.get("addTaskParent"),
					locatorMap.get("addTaskSummary"), obj[value2[count]]);
		} else if (value2[count] == "descriptionEntry") {
			basePage.dynamicSendKeys(locatorMap.get("addTaskParent"),
					locatorMap.get("addTaskDescription"), obj[value2[count]]);
		} else if (value2[count] == "locationEntry") {
			basePage.dynamicSendKeys(locatorMap.get("addTaskParent"),
					locatorMap.get("addTasklocation"), obj[value2[count]]);
		} else if (value2[count] == "assigneeEntry") {
			browser.driver.sleep(1000);
			basePage.dynamicSendKeys(locatorMap.get("addTaskParent"),
					locatorMap.get("addTaskAssignee"), obj[value2[count]]);
		}
	}
	browser.driver.sleep(1000);
	element(locatorMap.get("addTaskCreate")).click();
};

tasking_main_page.prototype.checkTaskInQueuePresent = function(value) {
	checkTaskDisplayed(value);
}

exports.tasking_main_page = new tasking_main_page();