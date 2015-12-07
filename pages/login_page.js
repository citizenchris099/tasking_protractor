var basePage = require('./page.js').page;

var locators = {};
locators.userName = by.xpath("//input[@placeholder='Username']");
locators.passWord = by.xpath("//input[@placeholder='Password']");
locators.login = by.xpath("//input[@type='submit']");

var login_page = function() {
};

login_page.prototype.isLoginPageLoaded = function() {
	basePage.isLoaded(locators.userName, locators.passWord);
}

login_page.prototype.taskingLogin = function(uName, pWord) {
	element(locators.userName).sendKeys(uName);
	element(locators.passWord).sendKeys(pWord);
	element(locators.login).click();
};

login_page.prototype.taskingLoginFail = function(uName, pWord, msg) {
	element(locators.userName).sendKeys(uName);
	element(locators.passWord).sendKeys(pWord);
	element(locators.login).click();
	basePage.msgCheck(msg);
};

exports.login_page = new login_page();
