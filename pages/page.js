var page = function() {
};

var chkElementPresent = function(locator) {
	browser.driver.wait(function() {
		return browser.driver.isElementPresent(locator);
	});
}

page.prototype.textCheck = function(element, string) {
	expect(element.getText()).toEqual(string);
};

page.prototype.msgCheck = function(msg) {
	chkElementPresent(by.xpath("//*[contains(text(), '" + msg + "')]"));
}

page.prototype.checkElementPresent = function(locator) {
	chkElementPresent(element1);
};

page.prototype.isLoaded = function(element1, element2) {
	chkElementPresent(element1);
	chkElementPresent(element2);
};

page.prototype.findElement = function(parent, child) {
	return browser.driver.findElement(parent).findElement(child);
}

page.prototype.findElements = function(parent, child) {
	return browser.driver.findElement(parent).findElements(child);
}

page.prototype.dynamicSendKeys = function(parent, child, value) {
	browser.actions().mouseMove(
			browser.driver.findElement(parent).findElement(child)).click()
			.sendKeys(value, protractor.Key.ENTER).perform();
};

page.prototype.dynamicSendKeysLoop = function(parent, child, value) {
	browser.actions().mouseMove(
			browser.driver.findElement(parent).findElement(child)).click()
			.perform();
	for (count = 0; count < value.length; count++) {
		browser.actions().sendKeys(value[count], protractor.Key.ENTER)
				.perform();
	}
};

exports.page = new page();