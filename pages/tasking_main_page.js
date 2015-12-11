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
locatorMap.set("dueDateParent", by
		.xpath(".//div[contains(@class,'datepicker__input-container')]"));
locatorMap.set("dueDateClear", by.xpath(".//div[@class='close-icon']"));

/**
 * locators: task queue
 */
locatorMap
		.set("taskListParent", by.xpath("//div[@class='taskqueue-tasklist']"));
locatorMap.set("moreTaskParent", by.xpath("//div[@class='load-more']"));
locatorMap.set("moreTaskButton", by.xpath(".//button[.='More Tasks']"));

/**
 * locators: task details
 */
locatorMap.set("taskDetailsParent", by.xpath("//div[@class='taskdetails']"));
locatorMap.set("taskDetailsSummary", by.xpath(".//textarea[@name='summary']"));
locatorMap.set("taskDetailsDescription", by
		.xpath(".//textarea[@name='description']"));

var flow = protractor.promise.controlFlow();
function waitOne() {
	return protractor.promise.delayed(1000);
}

function sleep() {
	flow.execute(waitOne);
};

/**
 * elements
 */

var clearDueDateElement = function(parent) {
	return element(parent).element(locatorMap.get("dueDateParent")).element(
			locatorMap.get("dueDateClear"));
};

var avatarElement = function() {
	return element(locatorMap.get("loginName"));
}

var logOutElement = function() {
	return element(locatorMap.get("logOut"));
}

var addTaskElement = function() {
	return basePage.findElement(locatorMap.get("showAddTaskParent"), locatorMap
			.get("showAddTaskForm"));
}

var revealAddTaskForm = function() {
	addTaskElement().click();
};

var datePickerElement = function(parent) {
	return basePage.findElement(locatorMap.get(parent), locatorMap
			.get("addTaskDueDate"));
};

var createTaskElement = function() {
	return element(locatorMap.get("addTaskCreate"))
};

var taskInQueue = function(value) {
	return basePage.findElement(locatorMap.get("taskListParent"), by
			.xpath("//span[contains(text(), '" + value
					+ "')] [@class='js-taskqueue-task-summary']"))
};

var moreTaskElement = function() {
	return basePage.findElement(locatorMap.get("moreTaskParent"), locatorMap
			.get("moreTaskButton"));
};

var taskDetailLocationAssignee = function(value) {
	return basePage.findElement(locatorMap.get("taskDetailsParent"), by
			.xpath(".//div[contains(text(), '" + value
					+ "')] [@class='Select-placeholder']"));
};

var taskDetailSummaryElement = function() {
	return basePage.findElement(locatorMap.get("taskDetailsParent"), locatorMap
			.get("taskDetailsSummary"));
};

var taskDetailDescriptionElement = function() {
	return basePage.findElement(locatorMap.get("taskDetailsParent"), locatorMap
			.get("taskDetailsDescription"));
};

var taskDetailLabelElement = function(value) {
	return basePage.findElement(locatorMap.get("taskDetailsParent"), by
			.xpath(".//span[contains(text(), '×')] [contains(@data-reactid,'"
					+ value + "')]"))
};

/**
 * actions
 */

var clickMoreTasks = function(value, action) {
	moreTaskElement().click().then(function() {
		if (action == "display") {
			checkTaskDisplayed(value);
		} else if (action == "click") {
			selectTaskDisplayed(value);
		}

	}, function(err) {
		throw err;
	});
};

var checkTaskDisplayed = function(value) {
	taskInQueue(value).isDisplayed().then(function() {
	}, function(err) {
		clickMoreTasks(value, "display");
	});
};

var selectTaskDisplayed = function(value) {
	taskInQueue(value).click().then(function() {
	}, function(err) {
		clickMoreTasks(value, "click");
	});
};

var checkTaskDetailsLabels = function(obj) {
	var labelsUsed = obj["labelEntry"];
	for (var count = 0; count < labelsUsed.length; count++) {
		basePage.displayCheck(taskDetailLabelElement(labelsUsed[count]), true);
	}
};

var removeTaskDetailsLabels = function(obj) {
	var labelsUsed = obj["labelEntry"];
	for (var count = 0; count < labelsUsed.length; count++) {
		taskDetailLabelElement(labelsUsed[count]).click();
	}
};

var taskValueEntry = function(parent, value2, obj) {
	for (var count = 0; count < value2.length; count++) {
		if (value2[count] == "labelEntry") {
			sleep();
			basePage.dynamicSendKeysLoop(locatorMap.get(parent), locatorMap
					.get("addTasklabels"), obj[value2[count]]);
		} else if (value2[count] == "addedDays") {
			datePickerElement(parent).click();
			obj.displayDate = datePicker.useDatePicker(obj[value2[count]]);
		} else {
			sleep();
			console.log("taskValueEntry else obj value = "+obj[value2[count]]+" and value = "+value2[count])
			basePage.dynamicSendKeys(locatorMap.get(parent), locatorMap
					.get(value2[count]), obj[value2[count]]);
		}
	}
}

/**
 * services
 */

tasking_main_page.prototype.isMainPageLoaded = function() {
	basePage.isLoaded(locatorMap.get("searchBox"), locatorMap.get("loginName"));
};

tasking_main_page.prototype.logOut = function() {
	avatarElement().click();
	logOutElement().click();
};

tasking_main_page.prototype.addTask = function(value2, obj) {
	revealAddTaskForm();
	taskValueEntry("addTaskParent", value2, obj);
	sleep();
	createTaskElement().click();
	checkTaskDisplayed(obj["addTaskSummary"]);
};

tasking_main_page.prototype.editTaskDetails = function(value, obj, editobj) {
	selectTaskDisplayed(obj["addTaskSummary"]);
	for (var count = 0; count < value.length; count++) {
		if (value[count] == "addTasklocation"
				|| value[count] == "addTaskAssignee") {
			basePage
					.dynamicBackSpace(taskDetailLocationAssignee(obj[value[count]]));
		} else if (value[count] == "addedDays") {
			clearDueDateElement(locatorMap.get("taskDetailsParent")).click();
		} else if (value[count] == "labelEntry") {
			removeTaskDetailsLabels(obj);
		} else if (value[count] == "taskDetailsSummary"
				|| value[count] == "taskDetailsDescription") {
			element(locatorMap.get("taskDetailsParent")).element(
					locatorMap.get(value[count])).clear().sendKeys("/",
					protractor.Key.BACK_SPACE, protractor.Key.TAB);
		}
	}
	taskValueEntry("taskDetailsParent", value, editobj);
	sleep();
	selectTaskDisplayed(editobj["addTaskSummary"]);
}

tasking_main_page.prototype.checkTaskDetails = function(value, obj) {
	selectTaskDisplayed(obj["addTaskSummary"]);
	basePage.textCheck(taskDetailSummaryElement(), obj["addTaskSummary"]);
	for (var count = 0; count < value.length; count++) {
		if (value[count] == "addTasklabels") {
			checkTaskDetailsLabels(obj);
		} else if (value[count] == "addTaskDescription") {
			basePage.textCheck(taskDetailDescriptionElement(),
					obj["addTaskDescription"]);
		} else if (value[count] == "addTasklocation"
				|| value[count] == "addTaskAssignee") {
			basePage.displayCheck(
					taskDetailLocationAssignee(obj[value[count]]), true);
		} else if (value[count] == "addedDays") {
			expect(datePickerElement("taskDetailsParent").getAttribute('value'))
					.toEqual(obj["displayDate"]);
		}
	}

};

exports.tasking_main_page = new tasking_main_page();