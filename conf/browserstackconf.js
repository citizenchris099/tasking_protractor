// conf.js
exports.config = {
	// directConnect : true,

	multiCapabilities : [ {
		'browserstack.user' : 'chrismanning1',
		'browserstack.key' : 'RXqoAFZLbgBpVNY91AsY',

		// Needed for testing localhost
		'browserstack.local' : 'true',
		'browserstack.localIdentifier' : 'Test123',

		'browserName' : 'chrome',
		'browser_version' : '46.0',
		'os' : 'Windows',
		'os_version' : '10',
		'resolution' : '1024x768'
	}, {
		'browserstack.user' : 'chrismanning1',
		'browserstack.key' : 'RXqoAFZLbgBpVNY91AsY',

		// Needed for testing localhost
		'browserstack.local' : 'true',
		'browserstack.localIdentifier' : 'Test123',

		'browser' : 'Firefox',
		'browser_version' : '42.0',
		'os' : 'Windows',
		'os_version' : '10',
		'resolution' : '1024x768'
	}

	],

	// framework : 'jasmine2',

	// seleniumAddress : 'http://localhost:4444/wd/hub',
	seleniumAddress : 'http://hub.browserstack.com/wd/hub',

	specs : [ '../tests/login_spec.js' ],

	// Options to be passed to Jasmine.
	jasmineNodeOpts : {
		showColors : true,
		defaultTimeoutInterval : 30000
	}
};
