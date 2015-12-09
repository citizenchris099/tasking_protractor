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
		.xpath("//button[contains(@class,'taskquickaddtoggle-button')]"));
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
locatorMap.set("moreTaskParent", by.xpath("//div[@class='load-more']"));
locatorMap.set("moreTaskButton", by.xpath(".//button[.='More Tasks']"));

var flow = protractor.promise.controlFlow();
function waitOne() {
	return protractor.promise.delayed(1000);
}

function sleep() {
	flow.execute(waitOne);
}

var revealAddTaskForm = function() {
	basePage.findElement(locatorMap.get("showAddTaskParent"),
			locatorMap.get("showAddTaskForm")).click();
};

var clickDatePicker = function(parent) {
	basePage.findElement(locatorMap.get(parent),
			locatorMap.get("addTaskDueDate")).click();
};

var taskInQueue = function(value) {
	return basePage.findElement(locatorMap.get("showAddTaskParent"), by
			.xpath("//span[contains(text(), '" + value
					+ "')] [@class='js-taskqueue-task-summary']"))
};

var clickMoreTasks = function(value) {
	basePage.findElement(locatorMap.get("moreTaskParent"),
			locatorMap.get("moreTaskButton")).click().then(function() {
		checkTaskDisplayed(value);
	}, function(err) {
		throw err;
	});
};

var checkTaskDisplayed = function(value) {
	taskInQueue(value).isDisplayed().then(function() {
		console.log("checkTaskDisplayed task displayed");
	}, function(err) {
		clickMoreTasks(value);
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
			sleep();
			basePage.dynamicSendKeysLoop(locatorMap.get("addTaskParent"),
					locatorMap.get("addTasklabels"), obj[value2[count]]);
		} else if (value2[count] == "addedDays") {
			clickDatePicker("addTaskParent");
			datePicker.useDatePicker(obj[value2[count]]);
		} else {
			sleep();
			basePage.dynamicSendKeys(locatorMap.get("addTaskParent"),
					locatorMap.get(value2[count]), obj[value2[count]]);
		}
	}
	sleep();
	element(locatorMap.get("addTaskCreate")).click();
	checkTaskDisplayed(obj["addTaskSummary"]);
};

tasking_main_page.prototype.checkTaskInQueuePresent = function(value) {
	checkTaskDisplayed(value);
}

exports.tasking_main_page = new tasking_main_page();