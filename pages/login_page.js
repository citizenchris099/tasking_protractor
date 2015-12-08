var login_page = function() {
};
var basePage = require('./page.js').page;
var locatorMap = new Map();
locatorMap.set("userName", by.xpath("//input[@placeholder='Username']"));
locatorMap.set("passWord", by.xpath("//input[@placeholder='Password']"));
locatorMap.set("login", by.xpath("//input[@type='submit']"));

login_page.prototype.isLoginPageLoaded = function() {
	basePage.isLoaded(locatorMap.get("userName"), locatorMap.get("passWord"));
}

var logIn = function(uName, pWord) {
	element(locatorMap.get("userName")).sendKeys(uName);
	element(locatorMap.get("passWord")).sendKeys(pWord);
	element(locatorMap.get("login")).click();
}

login_page.prototype.taskingLogin = function(uName, pWord) {
	logIn(uName, pWord);
};

login_page.prototype.taskingLoginFail = function(uName, pWord, msg) {
	logIn(uName, pWord);
	basePage.msgCheck(msg);
};

exports.login_page = new login_page();
