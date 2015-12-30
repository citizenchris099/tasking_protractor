var tasking_main_page = function() {
};
var basePage = require('./page.js').page;
var datePicker = require('./datePicker.js').datePicker;

var allFilterSearchMap = new Map();
allFilterSearchMap.set("allFilterLocation", "Search locations");
allFilterSearchMap.set("allFilterLabels", "Search labels");
allFilterSearchMap.set("allFilterAssignee", "Search assignees");

var statusMap = new Map();
statusMap.set("not started", 0);
statusMap.set("in progress", 1);
statusMap.set("on hold", 2);
statusMap.set("complete", 3);

var locatorMap = new Map();
locatorMap.set("loginName", by.xpath("//span[@class='avatar']"));
locatorMap.set("logOut", by.xpath("//span[.='Log Out']"));

// ////////locators //////////

/**
 * locators: filters
 */
locatorMap.set("searchBox", by.xpath(".//input[@placeholder='Search']"));
locatorMap.set("quickFiltersParent", by.xpath("//ul[@class='quickfilters']"));
locatorMap.set("quickFilterMenu", by.xpath(".//a[@class='quickfilter-item-link'] [contains(text(), 'Quick Filters')]"));
locatorMap.set("quickFilterMenuChoices", by.xpath(".//div[contains(@class,'quickfilter-item-choiceset')]"));
locatorMap.set("allFilters", by.xpath("//span[.='All Filters']"));
locatorMap.set("allFilterLocation", by.xpath("//div[@id='locations']"));
locatorMap.set("allFilterDue", by.xpath("//div[@id='due']"));
locatorMap.set("allFilterLabels", by.xpath("//div[@id='labels']"));
locatorMap.set("allFilterAssignee", by.xpath("//div[@id='assignees']"));
locatorMap.set("allFilterStatus", by.xpath("//div[@id='statuses']"));
locatorMap.set("allFilterMoreO", by.xpath("//div[@id='moreOptions']"));
locatorMap.set("allFiltersDropDownParent", by.xpath(".//div[contains(@class,'taskqueuefilters-filteritem-dropdown')]"));
locatorMap.set("allFiltersSearch", by.xpath(".//input[contains(@placeholder,'Search')]"));
locatorMap.set("clearAdFilters", by.xpath("//div[@class='taskqueuefilters-clearallfilters']"));

/**
 * locators: add task
 */
locatorMap.set("showAddTaskParent", by.xpath("//button[contains(@class,'taskquickaddtoggle-button')]"));
locatorMap.set("showAddTaskForm", by.xpath(".//i[contains(@class,'scicon-plus-circle-outline')]"));
locatorMap.set("addTaskParent", by.xpath("//div[contains(@class,'taskquickaddform')]"));
locatorMap.set("addTaskSummary", by.xpath(".//textarea[contains(@class,'taskquickaddform-summary')]"));
locatorMap.set("addTaskDescription", by.xpath(".//textarea[contains(@class,'taskquickaddform-description')]"));
locatorMap.set("addTasklocation", by.xpath(".//div[contains(@class,'Select-placeholder')] [.='Location']"));
locatorMap.set("addTaskDueDate", by.xpath(".//input[contains(@placeholder,'Due')]"));
locatorMap.set("addTasklabels", by.xpath(".//div[.='Labels']"));
locatorMap.set("addTaskAssignee", by.xpath(".//div[.='Assignee']"));
locatorMap.set("addTaskCreate", by.xpath("//button[.='Create']"));
locatorMap.set("dueDateParent", by.xpath(".//div[contains(@class,'datepicker__input-container')]"));
locatorMap.set("dueDateClear", by.xpath(".//div[@class='close-icon']"));
locatorMap.set("toastParent", by.xpath("//div[contains(@className,'sysmsg')]"));
locatorMap.set("closeToast", by.xpath("//div[@class='sysmsg-content-close']"));

/**
 * locators: task queue
 */
locatorMap.set("taskListGroup", by.xpath("//div[@class='taskqueue-togglegroup']"));
locatorMap.set("taskListParent", by.xpath("//div[@class='taskqueue-tasklist']"));
locatorMap.set("moreTaskParent", by.xpath("//div[@class='load-more']"));
locatorMap.set("moreTaskButton", by.xpath(".//button[.='More Tasks']"));
locatorMap.set("taskIsSelected", by.xpath(".//div[contains(@class,'is-selected')]"));
locatorMap.set("taskStatus", by.xpath(".//span[@class='js-taskqueue-task-status']"));
locatorMap.set("taskComplete", by.xpath(".//div[contains(@class,'mod-complete')]"));
locatorMap.set("taskBlocked", by.xpath(".//i[contains(@class,'scicon-alert-octagon')]"));
locatorMap.set("taskCanceled", by.xpath(".//i[contains(@class,'scicon-block-helper')]"));
locatorMap.set("taskStar", by.xpath(".//div[@class='taskqueue-task-star']"));
locatorMap.set("taskActivityFlags", by.xpath(".//div[@class='taskqueue-task-activity-flags']"));
locatorMap.set("taskActivityFlagsCommentNumParent", by.xpath(".//li[@class='iconlist-text']"));
locatorMap.set("taskCommentFlag", by.xpath(".//i[contains(@class,'scicon-comment-text-outline')]"));
locatorMap.set("taskOverDueParent", by.xpath(".//div[@class='taskqueue-task-overdue']"));
locatorMap.set("taskOverDueFlag", by.xpath(".//i[contains(@class,'scicon-clock-fast')]"));

/**
 * locators: task details
 */
locatorMap.set("taskDetailsParent", by.xpath("//div[@class='taskdetails']"));
locatorMap.set("taskDetailsSummary", by.xpath(".//textarea[@name='summary']"));
locatorMap.set("taskDetailsDescription", by.xpath(".//textarea[@name='description']"));
locatorMap.set("taskDetailsStatus", by.xpath(".//button[contains(@class,'mod-dropdownarrow')] [@aria-expanded='false']"));
locatorMap.set("taskDetailsStatusOption", by.xpath(".//a[@name='status']"));
locatorMap.set("taskDetailsBlockCancel", by.xpath(".//span[@class='scicon-dots-horizontal']"));
locatorMap.set("taskDetailsBlockedCanceledArea", by.xpath(".//div[contains(@class,'alert')]"));
locatorMap.set("taskDetailsBlockedCanceledAlert", by.xpath(".//div[.='Because I said so'] [@class='alert-description']"));

/**
 * locators: comments
 */
locatorMap.set("taskDetailsCommentField", by.xpath(".//textarea[contains(@placeholder,'Add a comment')]"));
locatorMap.set("taskDetailsCommentButton", by.xpath(".//button[contains(text(), 'Comment')]"));
locatorMap.set("existingCommentParent", by.xpath(".//div[@class='comment']"));
locatorMap.set("existingCommentAuthor", by.css(".comment-author span:nth-child(1)"));
locatorMap.set("existingCommentDateTime", by.css(".comment-author span:nth-child(2)"));
locatorMap.set("existingCommentText", by.xpath(".//div[@class='comment-text']"));

var flow = protractor.promise.controlFlow();
function waitOne() {
	return protractor.promise.delayed(1000);
}

function sleep() {
	flow.execute(waitOne);
};

// ////////elements //////////

/**
 * elements: user menu
 */
var avatarElement = function() {
	return element(locatorMap.get("loginName"));
};

var logOutElement = function() {
	return element(locatorMap.get("logOut"));
};

/**
 * elements: add task
 */
var addTaskElement = function() {
	return basePage.findElement(locatorMap.get("showAddTaskParent"), locatorMap.get("showAddTaskForm"));
};

var revealAddTaskForm = function() {
	addTaskElement().click();
};

var datePickerElement = function(parent) {
	return basePage.findElement(locatorMap.get(parent), locatorMap.get("addTaskDueDate"));
};

var createTaskElement = function() {
	return element(locatorMap.get("addTaskCreate"))
};

var closeToastMsg = function() {
	return element(locatorMap.get("closeToast"))
};

/**
 * elements: task details
 */
var taskDetailsBlockedCanceledHeader = function(value) {
	return element(locatorMap.get("taskDetailsParent")).element(locatorMap.get("taskDetailsBlockedCanceledArea")).element(
			by.xpath(".//span[contains(text(), '" + value + "')]"));
}

var taskDetailsBlockedCanceledAlert = function() {
	return element(locatorMap.get("taskDetailsParent")).element(locatorMap.get("taskDetailsBlockedCanceledArea")).element(
			locatorMap.get("taskDetailsBlockedCanceledAlert"));
}

var taskDetailsBlockedCanceledButton = function(value) {
	return element(locatorMap.get("taskDetailsParent")).element(locatorMap.get("taskDetailsBlockedCanceledArea")).element(
			by.xpath(".//button[contains(text(), '" + value + "')]"));
}

var taskStatusMenu = function() {
	return element(locatorMap.get("taskDetailsParent")).element(locatorMap.get("taskDetailsStatus"));
};

var taskStatusOptions = function() {
	return element.all(locatorMap.get("taskDetailsStatusOption"));
};

var taskStatus = function() {
	return element(locatorMap.get("taskListParent")).element(locatorMap.get("taskIsSelected")).element(
			locatorMap.get("taskStatus"));
}

var commentField = function() {
	return element(locatorMap.get("taskDetailsParent")).element(locatorMap.get("taskDetailsCommentField"));
};

var addCommentButton = function() {
	return element(locatorMap.get("taskDetailsParent")).element(locatorMap.get("taskDetailsCommentButton"));
};

var commentDetails = function(index, child) {
	return element(locatorMap.get("taskDetailsParent")).all(locatorMap.get("existingCommentParent")).get(index).element(
			locatorMap.get(child))
}

var clearDueDateElement = function(parent) {
	return element(parent).element(locatorMap.get("dueDateParent")).element(locatorMap.get("dueDateClear"));
};

var taskDetailLocationAssignee = function(value) {
	return basePage.findElement(locatorMap.get("taskDetailsParent"), by.xpath(".//div[contains(text(), '" + value
			+ "')] [@class='Select-placeholder']"));
};

var taskDetailSummaryElement = function() {
	return basePage.findElement(locatorMap.get("taskDetailsParent"), locatorMap.get("taskDetailsSummary"));
};

var taskDetailDescriptionElement = function() {
	return basePage.findElement(locatorMap.get("taskDetailsParent"), locatorMap.get("taskDetailsDescription"));
};

var taskDetailLabelElement = function(value) {
	return basePage.findElement(locatorMap.get("taskDetailsParent"), by
			.xpath(".//span[contains(text(), '×')] [contains(@data-reactid,'" + value + "')]"))
};

var blockOrCancelTaskMenu = function() {
	return element(locatorMap.get("taskDetailsParent")).element(locatorMap.get("taskDetailsBlockCancel"));
}

var blockOrCancelOption = function(value) {
	return element(locatorMap.get("taskDetailsParent")).element(
			by.xpath(".//a[contains(text(), '" + value + "')] [contains(@class,'dropdown-item')]"));
};

/**
 * elements: filters
 */
var clearAllFiltersElement = function() {
	return element(locatorMap.get("clearAdFilters"));
};

var allFilterDueTo = function() {
	return element(locatorMap.get("allFilterDue")).element(locatorMap.get("allFiltersDropDownParent")).element(
			locatorMap.get("allFilterDueTo"));
};

var searchFilter = function() {
	return element(locatorMap.get("searchBox"));
};

var allOrMyTaskFilter = function(value) {
	return element(locatorMap.get("quickFiltersParent")).element(
			by.xpath(".//a[contains(text(), '" + value + "')] [contains(@class,'quickfilter-item-link')]"));
};

var allOrMyTaskFilterActive = function(value) {
	return element(locatorMap.get("quickFiltersParent")).element(
			by.xpath(".//a[contains(text(), '" + value + "')] [contains(@class,'is-active')]"));
};

var quickFilterskMenu = function() {
	return element(locatorMap.get("quickFiltersParent")).element(locatorMap.get("quickFilterMenu"));
};

var quickFilterOption = function(value) {
	return element(locatorMap.get("quickFiltersParent")).all(locatorMap.get("quickFilterMenuChoices")).first().element(
			by.xpath(".//div[contains(text(), '" + value + "')] [contains(@class,'quickfilter-item-choiceset-link')]"));
};

var allFiltersMain = function() {
	return element(locatorMap.get("allFilters"));
};

var allFilterSearch = function(value) {
	return element(by.xpath("//input[contains(@placeholder,'" + value + "')]"))
}

var allFiltersSelection = function(value) {
	return element(By.xpath("//div[contains(@data-reactid,'" + value + "')] [@class='checkboxsquare ']"));
};

var allFilterDueFromTo = function(value) {
	return element(locatorMap.get("allFilterDue")).element(locatorMap.get("allFiltersDropDownParent")).element(
			by
					.xpath(".//span[contains(text(), '" + value
							+ "')] [@class='taskqueuefilters-filteritem-dropdown-date-label']"));
};

var allFilterCountElement = function(value) {
	return element(by.xpath("//div[contains(text(), '" + value + "')] [@class='showfilterstoggle-count']"));
}

/**
 * elements: task queue
 */
var taskFlag = function(value) {
	return element(locatorMap.get("taskListParent")).element(locatorMap.get("taskIsSelected"))
			.element(locatorMap.get(value));
};

var taskOverDueFlag = function() {
	return element(locatorMap.get("taskListParent")).element(locatorMap.get("taskIsSelected")).element(
			locatorMap.get("taskOverDueParent")).element(locatorMap.get("taskOverDueFlag"))
};

var taskOverDueText = function(value) {
	return element(locatorMap.get("taskListParent")).element(locatorMap.get("taskIsSelected")).element(
			locatorMap.get("taskOverDueParent")).element(
			by.xpath(".//span[contains(text(), '" + value + "')] [@class='taskqueue-task-overdue-text']"));
}

var commentCountFlag = function(value) {
	return element(locatorMap.get("taskListParent")).element(locatorMap.get("taskIsSelected")).element(
			locatorMap.get("taskActivityFlags")).element(locatorMap.get("taskActivityFlagsCommentNumParent")).element(
			by.xpath(".//span[contains(text(), '" + value + "')]"));
};

var commentFlag = function() {
	return element(locatorMap.get("taskListParent")).element(locatorMap.get("taskIsSelected")).element(
			locatorMap.get("taskActivityFlags")).element(locatorMap.get("taskCommentFlag"));
};

var starTask = function() {
	return element(locatorMap.get("taskListParent")).element(locatorMap.get("taskIsSelected")).element(
			locatorMap.get("taskStar"));
};

var taskQueueGroup = function(value) {
	return element(locatorMap.get("taskListGroup")).element(
			by.xpath(".//a[contains(text(), '" + value + "')] [contains(@class,'togglegroup-item-link ')]"));
};

var activeTaskQueueGroup = function(value) {
	return element(locatorMap.get("taskListGroup")).element(
			by.xpath(".//a[contains(text(), '" + value + "')] [contains(@class,'is-active')]"));
};

var taskInQueue = function(value) {
	return basePage.findElement(locatorMap.get("taskListParent"), by.xpath("//span[contains(text(), '" + value
			+ "')] [@class='js-taskqueue-task-summary']"))
};

var numberOfTaskInQueue = function(value) {
	return element.all(by.xpath("//span[contains(text(), '" + value + "')] [@class='js-taskqueue-task-summary']"));
};

var moreTaskElement = function() {
	return basePage.findElement(locatorMap.get("moreTaskParent"), locatorMap.get("moreTaskButton"));
};

// //////// actions //////////

/**
 * actions: add task
 */
var taskValueEntry = function(parent, value2, obj) {
	for (var count = 0; count < value2.length; count++) {
		if (value2[count] == "labelEntry") {
			sleep();
			basePage.dynamicSendKeysLoop(locatorMap.get(parent), locatorMap.get("addTasklabels"), obj[value2[count]]);
		} else if (value2[count] == "addedDays") {
			datePickerElement(parent).click();
			datePicker.useDatePicker(obj[value2[count]]);
		} else {
			sleep();
			basePage.dynamicSendKeys(locatorMap.get(parent), locatorMap.get(value2[count]), obj[value2[count]]);
		}
	}
}

var closeSuccessMsg = function() {
	closeToastMsg().isDisplayed().then(function() {
		closeToastMsg().click();
	}, function(err) {
		throw err;
	})

};

/**
 * actions: task details
 */
var checkTaskDetailsBlockedCanceled = function(value1, value2, boolean) {
	expect(taskDetailsBlockedCanceledHeader(value1).isDisplayed()).toBe(boolean);
	expect(taskDetailsBlockedCanceledAlert().isDisplayed()).toBe(boolean);
	expect(taskDetailsBlockedCanceledButton(value2).isDisplayed()).toBe(boolean);
};

var selectTaskStatus = function(value) {
	taskStatusMenu().click();
	taskStatusOptions().get(value).click();
};

var checkTaskStatus = function(obj) {
	taskStatus().getText().then(function(text) {
		expect(text.trim().toLowerCase()).toEqual(obj["taskStatus"]);
	}, function(err) {
		throw err;
	})
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

var addCommentToTask = function(value) {
	commentField().sendKeys(value);
	addCommentButton().click();
};

var commentInfoValidation = function(index, obj) {
	var value = [ "existingCommentAuthor", "existingCommentDateTime", "existingCommentText" ];
	for (var count = 0; count < value.length; count++) {
		(function(passedInCount) {
			commentDetails(index, value[passedInCount]).getText().then(function(text) {
				var array = text.split(",");
				expect(array[0]).toEqual(obj[value[passedInCount]]);
			}, function(err) {
				throw err;
			})
		})(count);
	}
};

var allerts = function(choice) {
	if (choice == "accept") {
		browser.driver.switchTo().alert().sendKeys("Because I said so");
		browser.driver.switchTo().alert().accept();
	} else if (choice == "decline") {
		browser.driver.switchTo().alert().dismiss();
	}
};

var blockOrCancelTask = function(choice) {
	blockOrCancelTaskMenu().click();
	blockOrCancelOption(choice).click()
	allerts("accept");
};

/**
 * actions: task queue
 */
var starTaskClick = function() {
	starTask().click();
};

var selectTaskQueueGroup = function(value) {
	taskQueueGroup(value).click().then(function() {
		expect(activeTaskQueueGroup(value).isDisplayed()).toBe(true);
	}, function(err) {
		throw err;
	})
};

var checkTaskFlag = function(value, boolean) {
	expect(taskFlag(value).isDisplayed()).toBe(boolean);
};

var checkCommentCountFlag = function(value, boolean) {
	expect(commentCountFlag(value).isDisplayed()).toBe(boolean);
};

var checkCommentFlag = function(boolean) {
	expect(commentFlag().isDisplayed()).toBe(boolean);
};

var checkTaskOverDueFlag = function(boolean){
	expect(taskOverDueFlag().isDisplayed()).toBe(boolean);
};

var checkTaskOverDueText = function(value, boolean){
	expect(taskOverDueText(value).isDisplayed()).toBe(boolean);
}

var clickMoreTasks = function(value, boolean) {
	moreTaskElement().click().then(function() {
		checkTaskDisplayed(value, boolean);
	}, function(err) {
		expect(false).toBe(boolean);
	});
};

var checkTaskDisplayed = function(value, boolean) {
	taskInQueue(value).isDisplayed().then(function(display) {
		expect(display).toBe(boolean);
		sleep();
		taskInQueue(value).click();
	}, function(err) {
		clickMoreTasks(value, boolean);
	});
};

/**
 * actions: filters
 */
var selectAllOrMyFilter = function(value) {
	allOrMyTaskFilter(value).click().then(function() {
		expect(allOrMyTaskFilterActive(value).isDisplayed()).toBe(true);
	}, function(err) {
		throw err;
	})
};

var useSearchFilter = function(value) {
	browser.actions().mouseMove(searchFilter()).click().sendKeys(value, protractor.Key.ENTER).perform();
}

var selectQuickFilter = function(value) {
	quickFilterskMenu().click();
	quickFilterOption(value).click();
};

var useAllFilters = function(value1, value2) {
	allFiltersMain().click();
	element(locatorMap.get(value1)).click();
	allFiltersSelection(value2).click();
	allFiltersMain().click();
};

var useAllFilterSearch = function(value1, value2, value3) {
	allFiltersMain().click();
	element(locatorMap.get(value1)).click();
	allFilterSearch(allFilterSearchMap.get(value1)).sendKeys(value2);
	allFiltersSelection(value3).click();
	allFilterSearch(allFilterSearchMap.get(value1)).clear().sendKeys("/", protractor.Key.BACK_SPACE, protractor.Key.TAB);
	allFiltersMain().click();
};

var clearAllFilters = function() {
	allFiltersMain().click();
	clearAllFiltersElement().click();
	allFiltersMain().click();
};

var setAllFilterDueDate = function(value1, value2) {
	element(locatorMap.get("allFilterDue")).click();
	allFilterDueFromTo("From").click();
	datePicker.useDatePicker(value1);
	allFilterDueFromTo("To").click();
	datePicker.useDatePicker(value2);
};

var checkAllFilterCount = function(value, boolean) {
	expect(allFilterCountElement(value).isDisplayed()).toBe(boolean);
};

// ////////services //////////

/**
 * services: utility
 */
tasking_main_page.prototype.isMainPageLoaded = function() {
	basePage.isLoaded(locatorMap.get("searchBox"), locatorMap.get("loginName"));
};

tasking_main_page.prototype.displayDate = function(value) {
	return datePicker.displayDate(value);
};

tasking_main_page.prototype.logOut = function() {
	avatarElement().click();
	logOutElement().click();
};

/**
 * services: add task
 */
tasking_main_page.prototype.addTask = function(value2, obj) {
	revealAddTaskForm();
	taskValueEntry("addTaskParent", value2, obj);
	sleep();
	createTaskElement().click();
	closeSuccessMsg();
	checkTaskDisplayed(obj["addTaskSummary"], true);
};

/**
 * services: task details
 */
tasking_main_page.prototype.editTaskDetails = function(value, obj, editobj) {
	checkTaskDisplayed(obj["addTaskSummary"], true);
	for (var count = 0; count < value.length; count++) {
		if (value[count] == "addTasklocation" || value[count] == "addTaskAssignee") {
			basePage.dynamicBackSpace(taskDetailLocationAssignee(obj[value[count]]));
		} else if (value[count] == "addedDays") {
			clearDueDateElement(locatorMap.get("taskDetailsParent")).click();
		} else if (value[count] == "labelEntry") {
			removeTaskDetailsLabels(obj);
		} else if (value[count] == "taskDetailsSummary" || value[count] == "taskDetailsDescription") {
			element(locatorMap.get("taskDetailsParent")).element(locatorMap.get(value[count])).clear().sendKeys("/",
					protractor.Key.BACK_SPACE, protractor.Key.TAB);
		}
	}
	taskValueEntry("taskDetailsParent", value, editobj);
	sleep();
	checkTaskDisplayed(editobj["addTaskSummary"], true);
};

tasking_main_page.prototype.checkTaskDetails = function(value, obj) {
	checkTaskDisplayed(obj["addTaskSummary"], true);
	basePage.textCheck(taskDetailSummaryElement(), obj["addTaskSummary"]);
	for (var count = 0; count < value.length; count++) {
		if (value[count] == "labelEntry") {
			checkTaskDetailsLabels(obj);
		} else if (value[count] == "addTaskDescription") {
			basePage.textCheck(taskDetailDescriptionElement(), obj["addTaskDescription"]);
		} else if (value[count] == "addTasklocation" || value[count] == "addTaskAssignee") {
			basePage.displayCheck(taskDetailLocationAssignee(obj[value[count]]), true);
		} else if (value[count] == "addedDays") {
			expect(datePickerElement("taskDetailsParent").getAttribute('value')).toEqual(obj["displayDate"]);
		}
	}

};

tasking_main_page.prototype.checkTaskDetailsBlocked = function(obj, boolean) {
	checkTaskDisplayed(obj["addTaskSummary"], true);
	checkTaskDetailsBlockedCanceled("Task Blocked", "Unblock", boolean);
};

tasking_main_page.prototype.checkTaskDetailsCanceled = function(obj, boolean) {
	checkTaskDisplayed(obj["addTaskSummary"], true);
	checkTaskDetailsBlockedCanceled("Task Canceled", "Reopen", boolean);
};

tasking_main_page.prototype.blockTask = function(obj) {
	checkTaskDisplayed(obj["addTaskSummary"], true);
	blockOrCancelTask("Block Task");
};

tasking_main_page.prototype.cancelTask = function(obj) {
	checkTaskDisplayed(obj["addTaskSummary"], true);
	blockOrCancelTask("Cancel Task");
};

tasking_main_page.prototype.changeTaskStatus = function(obj) {
	checkTaskDisplayed(obj["addTaskSummary"], true);
	selectTaskStatus(statusMap.get(obj["taskStatus"]));
};

tasking_main_page.prototype.addComment = function(obj, value) {
	checkTaskDisplayed(obj["addTaskSummary"], true);
	addCommentToTask(value);
};

tasking_main_page.prototype.checkComment = function(index, obj) {
	checkTaskDisplayed(obj["addTaskSummary"], true);
	commentInfoValidation(index, obj);
};

/**
 * services: task queue
 */
tasking_main_page.prototype.starTaskInQueue = function(obj) {
	checkTaskDisplayed(obj["addTaskSummary"], true);
	starTaskClick();
};

tasking_main_page.prototype.checkTaskNotInQueue = function(obj, value) {
	selectTaskQueueGroup(value)
	checkTaskDisplayed(obj["addTaskSummary"], false);
};

tasking_main_page.prototype.checkTaskInQueue = function(obj, value) {
	selectTaskQueueGroup(value)
	checkTaskDisplayed(obj["addTaskSummary"], true);
};

tasking_main_page.prototype.checkTaskStatus = function(obj) {
	checkTaskDisplayed(obj["addTaskSummary"], true);
	checkTaskStatus(obj);
};

tasking_main_page.prototype.checkTaskFlag = function(obj, boolean) {
	checkTaskDisplayed(obj["addTaskSummary"], true);
	checkTaskFlag(obj["flag"], boolean);
};

tasking_main_page.prototype.checkTaskCommentFlags = function(obj, value, boolean) {
	checkTaskDisplayed(obj["addTaskSummary"], true);
	checkCommentCountFlag(value, boolean);
	checkCommentFlag(boolean);
};

tasking_main_page.prototype.checkTaskOverDueFlags = function(obj, value, boolean){
	checkTaskDisplayed(obj["addTaskSummary"], true);
	checkTaskOverDueFlag(boolean);
	checkTaskOverDueText(value, boolean);
}

/**
 * services: filters
 */
tasking_main_page.prototype.allFilterCountCheck = function(value, boolean) {
	checkAllFilterCount(value, boolean);
}

tasking_main_page.prototype.useAllFilters = function(value1, value2) {
	for (var count = 0; count < value1.length; count++) {
		useAllFilters(value1[count], value2[count]);
	}
};

tasking_main_page.prototype.useAllFiltersSearch = function(value1, value2, value3) {
	for (var count = 0; count < value1.length; count++) {
		useAllFilterSearch(value1[count], value2[count], value3[count]);
	}
};

tasking_main_page.prototype.clearAllFilterSelection = function() {
	clearAllFilters();
};

tasking_main_page.prototype.useAllFilterDueDate = function(value1, value2) {
	allFiltersMain().click();
	setAllFilterDueDate(value1, value2);
}

tasking_main_page.prototype.tasksIStarredQuickFilter = function() {
	selectQuickFilter("Tasks I Starred");
};

tasking_main_page.prototype.tasksICreatedQuickFilter = function() {
	selectQuickFilter("Tasks I Created");
};

tasking_main_page.prototype.blockedTasksQuickFilter = function() {
	selectQuickFilter("Blocked Tasks");
};

tasking_main_page.prototype.allTasksFilter = function() {
	selectAllOrMyFilter("All Tasks");
};

tasking_main_page.prototype.myTasksFilter = function() {
	selectAllOrMyFilter("My Tasks");
};

tasking_main_page.prototype.useSearchFilter = function(obj, value) {
	useSearchFilter(value);
	checkTaskDisplayed(obj["addTaskSummary"], true);
};

exports.tasking_main_page = new tasking_main_page();