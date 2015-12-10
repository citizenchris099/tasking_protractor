var datePicker = function() {
};
var basePage = require('./page.js').page;
var locatorMap = new Map();
locatorMap.set("datePickerParent", by.xpath("//div[@class='datepicker']"));
locatorMap
		.set("datePickerNextMonth", by.xpath(".//a[contains(@class,'next')]"));
locatorMap.set("datePickerCurrentMonth", by
		.xpath(".//span[@class='datepicker__current-month']"));
locatorMap.set("1", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='1']"));
locatorMap.set("2", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='2']"));
locatorMap.set("3", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='3']"));
locatorMap.set("4", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='4']"));
locatorMap.set("5", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='5']"));
locatorMap.set("6", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='6']"));
locatorMap.set("7", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='7']"));
locatorMap.set("8", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='8']"));
locatorMap.set("9", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='9']"));
locatorMap.set("10", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='10']"));
locatorMap.set("11", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='11']"));
locatorMap.set("12", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='12']"));
locatorMap.set("13", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='13']"));
locatorMap.set("14", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='14']"));
locatorMap.set("15", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='15']"));
locatorMap.set("16", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='16']"));
locatorMap.set("17", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='17']"));
locatorMap.set("18", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='18']"));
locatorMap.set("19", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='19']"));
locatorMap.set("20", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='20']"));
locatorMap.set("21", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='21']"));
locatorMap.set("22", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='22']"));
locatorMap.set("23", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='23']"));
locatorMap.set("24", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='24']"));
locatorMap.set("25", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='25']"));
locatorMap.set("26", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='26']"));
locatorMap.set("27", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='27']"));
locatorMap.set("28", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='28']"));
locatorMap.set("29", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='29']"));
locatorMap.set("30", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='30']"));
locatorMap.set("31", by
		.xpath(".//div[contains(@class,'datepicker__day')] [.='31']"));

var MonthMap = new Map();
MonthMap.set("January", "1");
MonthMap.set("February", "2");
MonthMap.set("March", "3");
MonthMap.set("April", "4");
MonthMap.set("May", "5");
MonthMap.set("June", "6");
MonthMap.set("July", "7");
MonthMap.set("August", "8");
MonthMap.set("September", "9");
MonthMap.set("October", "10");
MonthMap.set("November", "11");
MonthMap.set("December", "12");

var today = new Date();
var dd = today.getDate();
var tomorrow = today.getDate();
var mm = today.getMonth() + 1; // January is 0!
var yyyy = today.getFullYear();
var displayDay;
var displayTomorrow;

if (dd < 10) {
	displayDay = '0' + dd
}

today = mm + '/' + displayDay + '/' + yyyy;

datePicker.prototype.testDate = function(value) {
	var testday = tomorrow + value;
	if (testday < 10) {
		displayTomorrow = '0' + testday
	}
	var testDate = mm + '/' + displayTomorrow + '/' + yyyy;
	return testDate.toString()
}

datePicker.prototype.useDatePicker = function(value) {
	basePage.findElement(locatorMap.get("datePickerParent"),
			locatorMap.get("datePickerCurrentMonth")).getText().then(
			function(text) {
				var splitDate = text.split(' ');
				var splitDatNumber = MonthMap.get(splitDate[0]);
				if (splitDatNumber != mm) {
					basePage.findElement(locatorMap.get("datePickerParent"),
							locatorMap.get("datePickerNextMonth")).click();
				}
			});
	var testday = tomorrow + value;
	console.log("useDatePicker testDay = "+testday)
	var days = element.all(locatorMap.get(testday.toString()));
	if (testday > 25) {
		days.get(1).element(locatorMap.get("datePickerParent")).element(
				locatorMap.get(testday.toString())).click();
	} else
		days.get(0).element(locatorMap.get("datePickerParent")).element(
				locatorMap.get(testday.toString())).click();
};
exports.datePicker = new datePicker();