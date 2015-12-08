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

var addTaskEntryMap = new Map();
addTaskEntryMap.set("summaryEntry", "tubular summary");
addTaskEntryMap.set("descriptionEntry", "A Rad Description");
addTaskEntryMap.set("locationEntry", "Hey Now");
addTaskEntryMap.set("labelEntry", [ "hey", "now" ]);
addTaskEntryMap.set("assigneeEntry", "Test User");

tasking_main_page.prototype.isMainPageLoaded = function() {
	basePage.isLoaded(locatorMap.get("searchBox"), locatorMap.get("loginName"));
}

tasking_main_page.prototype.logOut = function() {
	element(locatorMap.get("loginName")).click();
	element(locatorMap.get("logOut")).click();
};

tasking_main_page.prototype.revealAddTaskForm = function() {
	basePage.findElement(locatorMap.get("showAddTaskParent"),
			locatorMap.get("showAddTaskForm")).click();
};

var clickDatePicker = function(parent) {
	basePage.findElement(locatorMap.get(parent),
			locatorMap.get("addTaskDueDate")).click();
}

tasking_main_page.prototype.addTask = function(value, value2) {
	for (count = 0; count < value.length; count++) {
		if (value[count] == "addTasklabels") {
			basePage.dynamicSendKeysLoop(locatorMap.get("addTaskParent"),
					locatorMap.get(value[count]), addTaskEntryMap
							.get(value2[count]));
		} else if (value[count] == "addTaskDueDate") {
			var testDate = datePicker.testDate();
			console.log("test date = " + testDate);
			clickDatePicker("addTaskParent");
			datePicker.useDatePicker();
			clickDatePicker("addTaskParent");
		} else
			basePage.dynamicSendKeys(locatorMap.get("addTaskParent"),
					locatorMap.get(value[count]), addTaskEntryMap
							.get(value2[count]));
	}
	element(locatorMap.get("addTaskCreate")).click();
};

exports.tasking_main_page = new tasking_main_page();