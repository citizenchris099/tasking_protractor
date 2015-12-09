var phraseGen = function() {
};
var basePage = require('./page.js').page;
var MMPhraseGenerator = {
	phrase : function() {
		return this.adjective() + " " + this.name() + " " + this.verb() + " "
				+ this.adverb() + " " + this.noun();
	},

	name : function() {
		return this.randomItemFrom(this.names);
	},
	noun : function() {
		return this.randomItemFrom(this.nouns);
	},
	verb : function() {
		return this.randomItemFrom(this.verbs);
	},
	adjective : function() {
		return this.randomItemFrom(this.adjectives);
	},
	adverb : function() {
		return this.randomItemFrom(this.adverbs);
	},
	company : function() {
		return this.randomItemFrom(this.companies);
	},
	city : function() {
		return this.randomItemFrom(this.cities);
	},
	usStateCode : function() {
		return this.randomItemFrom(this.usStateCodes);
	},
	randomItemFrom : function(array) {
		return array[(this.randomNumber(0, (array.length - 1)))];
	},
	randomNumber : function(minNumber, maxNumber) {

		if (minNumber > maxNumber) {
			minNumber = 1;
			maxNumber = 10;
		}

		var randomNumber = (Math.floor(Math.random() * maxNumber)) + minNumber;
		return randomNumber;
	},
	isHeads : function() {
		flip = this.randomNumber(0, 1);
		return flip == 1;
	},
	names : [ "Aaron Burr", "Abraham Lincoln", "Adlai E. Stevenson", "Al Gore",
			"Alben Barkley", "Andrew Jackson", "Andrew Johnson",
			"Barack Obama", "Benjamin Harrison", "Bill Clinton",
			"Calvin Coolidge", "Charles Curtis", "Charles Dawes",
			"Charles Fairbanks", "Chester Arthur", "Dan Quayle",
			"Daniel D. Tompkins", "Dick Cheney", "Dwight D. Eisenhower",
			"Elbridge Gerry", "Franklin D. Roosevelt", "Franklin Pierce",
			"Garret Hobart", "George Bush", "George Clinton",
			"George M. Dallas", "George W. Bush", "George Washington",
			"Gerald Ford", "Grover Cleveland", "Hannibal Hamlin",
			"Harry S Truman", "Henry A. Wallace", "Henry Wilson",
			"Herbert Hoover", "Hubert Humphrey", "James A. Garfield",
			"James Buchanan", "James K. Polk", "James Madison", "James Monroe",
			"James S. Sherman", "Jimmy Carter", "Joe Biden ", "John Adams",
			"John C. Breckinridge", "John C. Calhoun", "John F. Kennedy",
			"John Nance Garner", "John Quincy Adams", "John Tyler",
			"Levi P. Morton", "Lyndon B. Johnson", "Martin Van Buren",
			"Millard Fillmore", "Nelson Rockefeller", "Richard M. Johnson",
			"Richard Nixon", "Ronald Reagan", "Rutherford B. Hayes",
			"Schuyler Colfax", "Spiro Agnew", "Theodore Roosevelt",
			"Thomas Hendricks", "Thomas Jefferson", "Thomas R. Marshall",
			"Ulysses S. Grant", "Walter Mondale", "Warren G. Harding",
			"William Henry Harrison", "William Howard Taft", "William King",
			"William McKinley", "William Wheeler", "Woodrow Wilson",
			"Zachary Taylor" ],
	nouns : [ "time", "person", "year", "way", "day", "thing", "man", "world",
			"life", "hand", "part", "child", "eye", "woman", "place", "work",
			"week", "case", "point", "government", "company", "number",
			"group", "problem", "fact", "able", "achieve", "acoustics",
			"action", "activity", "aftermath", "afternoon", "afterthought",
			"apparel", "appliance", "beginner", "believe", "bomb", "border",
			"boundary", "breakfast", "cabbage", "cable", "calculator",
			"calendar", "caption", "carpenter", "cemetery", "channel",
			"circle", "creator", "creature", "education", "faucet", "feather",
			"friction", "fruit", "fuel", "galley", "guide", "guitar", "health",
			"heart", "idea", "kitten", "laborer", "language", "lawyer",
			"linen", "locket", "lumber", "magic", "minister", "mitten",
			"money", "mountain", "music", "partner", "passenger", "pickle",
			"picture", "plantation", "plastic", "pleasure", "pocket", "police",
			"pollution", "railway", "recess", "reward", "route", "scene",
			"scent", "squirrel", "stranger", "suit", "sweater", "temper",
			"territory", "texture", "thread", "treatment", "veil", "vein",
			"volcano", "wealth", "weather", "wilderness", "wren", "wrist",
			"writer" ],
	verbs : [ "add", "allow", "ask", "bake", "bang", "be", "call", "chase",
			"come", "damage", "do", "drop", "end", "escape", "fasten", "feel",
			"find", "fix", "gather", "get", "give", "go", "grab", "hang",
			"have", "hug", "imagine", "itch", "jog", "jump", "kick", "knit",
			"know", "land", "leave", "lock", "look", "make", "march", "mix",
			"name", "notice", "obey", "open", "pass", "promise", "question",
			"reach", "rinse", "say", "scatter", "see", "seem", "stay", "take",
			"talk", "tell", "think", "try", "turn", "untie", "use", "vanish",
			"visit", "walk", "want", "work", "yawn", "yell", "zip", "zoom" ],
	adjectives : [ "good", "new", "first", "last", "long", "great", "little",
			"own", "other", "old", "right", "big", "high", "different",
			"small", "large", "next", "early", "young", "important", "few",
			"public", "bad", "same", "able" ],
	adverbs : [ "up", "so", "out", "just", "now", "how", "then", "more",
			"also", "here", "well", "only", "very", "even", "back", "there",
			"down", "still", "in", "as", "too", "when", "never", "really",
			"most" ],
	companies : [ "Google", "Boston Consulting Group", "SAS Institute",
			"Wegmans Food Markets", "Edward Jones", "NetApp",
			"Camden Property Trust", "Recreational Equipment (REI)",
			"CHG Healthcare Services", "Quicken Loans", "Zappos.com",
			"Mercedes-Benz USA", "DPR Construction", "DreamWorks Animation",
			"NuStar Energy", "Kimpton Hotels & Restaurants",
			"JM Family Enterprises", "Chesapeake Energy", "Intuit", "USAA",
			"Robert W. Baird", "The Container Store", "Qualcomm",
			"Alston & Bird", "Ultimate Software", "Burns & McDonnell",
			"Salesforce.com", "Devon Energy", "PCL Construction",
			"Bingham McCutchen", "Scottrade", "Whole Foods Market",
			"Goldman Sachs", "Nugget Market",
			"Millennium: The Takeda Oncology Co.",
			"Southern Ohio Medical Center", "Plante Moran",
			"W. L. Gore & Associates", "St. Jude Children's Research Hospital",
			"SVB Financial Group", "Adobe", "Baptist Health South Florida",
			"Novo Nordisk", "Balfour Beatty Construction",
			"National Instruments", "Intel", "American Fidelity Assurance",
			"PricewaterhouseCoopers", "Children's Healthcare of Atlanta",
			"World Wide Technology", "Allianz Life Insurance", "Autodesk",
			"Methodist Hospital", "Baker Donelson", "Men's Wearhouse",
			"Scripps Health", "Marriott International", "Perkins Coie",
			"Ernst & Young", "American Express", "Nordstrom",
			"Build-A-Bear Workshop", "General Mills", "TDIndustries",
			"Atlantic Health", "QuikTrip", "Deloitte", "Genentech",
			"Umpqua Bank", "Teach For America", "Mayo Clinic", "EOG Resources",
			"Starbucks", "Rackspace Hosting", "FactSet Research Systems",
			"Microsoft", "Aflac", "Publix Super Markets", "Mattel", "Stryker",
			"SRC", "Hasbro", "Bright Horizons Family Solutions",
			"Booz Allen Hamilton", "Four Seasons Hotels & Resorts",
			"Hitachi Data Systems", "The Everett Clinic", "OhioHealth",
			"Morningstar", "Cisco", "CarMax", "Accenture", "GoDaddy.com",
			"KPMG", "Navy Federal Credit Union", "Meridian Health",
			"Schweitzer Engineering Labs", "Capital One", "Darden Restaurants",
			"Intercontinental Hotels Group" ],
	cities : [ "Shanghai", "Istanbul", "Karachi", "Mumbai", "Moscow",
			"Beijing", "Sâ€¹o Paulo", "Tianjin", "Guangzhou", "Delhi", "Seoul",
			"Shenzhen", "Jakarta", "Tokyo", "Mexico City", "Kinshasa",
			"Tehran", "Bangalore", "New York City", "Dongguan", "London",
			"Lagos", "Lima", "Bogotâ€¡", "Ho Chi Minh City", "Hong Kong",
			"Bangkok", "Dhaka", "Hyderabad", "Cairo", "Hanoi", "Wuhan",
			"Rio de Janeiro", "Lahore", "Ahmedabad", "Baghdad", "Riyadh",
			"Singapore", "Santiago", "Saint Petersburg", "Chennai",
			"Chongqing", "Kolkata", "Surat", "Yangon", "Ankara", "Alexandria",
			"Shenyang", "Suzhou", "New Taipei", "Johannesburg", "Los Angeles",
			"Yokohama", "Abidjan", "Busan", "Berlin", "Cape Town", "Durban",
			"Jeddah", "Pyongyang", "Madrid", "Nairobi", "Pune", "Jaipur",
			"Casablanca" ],
	usStateCodes : [ "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC",
			"FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
			"MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
			"NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD",
			"TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY" ]
};

phraseGen.prototype.randomName = function() {
	return MMPhraseGenerator.name();
}

phraseGen.prototype.randomPhrase = function() {
	return MMPhraseGenerator.phrase();
}

phraseGen.prototype.randomLabel = function() {
	return MMPhraseGenerator.adjective() + " " + MMPhraseGenerator.noun();
}

phraseGen.prototype.randomLocation = function() {
	return MMPhraseGenerator.city() + ", " + MMPhraseGenerator.usStateCode();
}

exports.phraseGen = new phraseGen();