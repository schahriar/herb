// Modules
var _ = require('lodash');
var culinary = require('culinary');
// Source
var parse = require('./parsers/arguments');
var progress = require('./parsers/progress');
// Clean copy
var native_console = console;

var config = defaults = {
	json: {
		indent: 4,
		offset: 2
	},
	verbose: 3, // 4: Info, 3: Log, 2: Warn, 1: Error
	prependTime: false,
	testSuite: false
}

// Memory buffers
var buffers = {
	count: {},
	group: []
}

var herb = {
	__super__ : {
		getSize: culinary.getSize,
		culinary: culinary,

		parse: function(){
                	parse.logType(config, buffers, arguments, { verbosity: 0, color: 'blue', strict: true }, function(parsed){
                        	var callback = parsed.shift();
                        	callback.apply(this, parsed);
                	});
        	},
		config: function(userConfig){
                // Made verbose & verbosity attributes flexible
                	if((_.isNumber(userConfig.verbosity))&&(!userConfig.verbose)) userConfig.verbose = userConfig.verbosity;

           		_.defaults(userConfig, defaults);
           		_.defaults(userConfig, config);
           		config = userConfig;
        	},
	},
	
	info: function(){
		parse.logType(config, buffers, arguments, { verbosity: 4, color: 'blue' }, function(parsed){
			native_console.info.apply(this, parsed);
		});
	},
	log: function(){
		parse.logType(config, buffers, arguments, { verbosity: 3, color: 'blue' }, function(parsed){
			native_console.log.apply(this, parsed);
		});
	},
	warn: function(){
		parse.logType(config, buffers, arguments, { verbosity: 2, color: 'yellow' }, function(parsed){
			native_console.warn.apply(this, parsed);
		});
	},
	error: function(){
		parse.logType(config, buffers, arguments, { verbosity: 1, color: 'red' }, function(parsed){
			native_console.error.apply(this, parsed);
		});
	},

	time: function(){ native_console.time.apply(this, arguments) },
	timeEnd: function(){ native_console.timeEnd.apply(this, arguments) },
	trace: function(){ native_console.trace.apply(this, arguments) },
	dir: function(){ native_console.dir.apply(this, arguments) },
	assert: function(){ native_console.assert.apply(this, arguments) },

	// Extended	
	clear: culinary.clearScreen,
	clearLine: culinary.eraseLine,
	writeLine: function(){
		culinary.cursorTo(0);
		parse.logType(config, buffers, arguments, { verbosity: 2, color: 'cyan' }, function(parsed){
			process.stdout.write(parsed[0]);
		});
	},
	center: function(){
		parse.logType(config, buffers, arguments, { verbosity: 2, color: 'cyan', alignment: 'center' }, function(parsed){
			native_console.log.apply(this, parsed);
			culinary.scrollDown();
		})
	},
	right: function(){
                parse.logType(config, buffers, arguments, { verbosity: 2, color: 'cyan', alignment: 'right' }, function(parsed){
			native_console.log.apply(this, parsed);
			culinary.scrollDown();
                })
        },
	left: function(){
		parse.logType(config, buffers, arguments, { verbosity: 2, color: 'cyan', alignment: 'left' }, function(parsed){
                        native_console.log.apply(this, parsed);
                        culinary.scrollDown();
                })	
	},
	count: function(label){
		parse.count(config, buffers, label, { color: 'blue' }, function(parsed){
			native_console.log.apply(this, parsed);
		});
	},
	group: function(label){
		buffers.group.push('label');
		parse.logType(config, buffers, [label], { verbosity: 2, color: 'bold', title: true }, function(parsed){
			native_console.log.apply(this, parsed);
		});
	},
	groupEnd: function(){
	   // Remove last element from the array
	   buffers.group.pop();
	}
}

// Aliases
	herb.config = herb.__super__.config;
	// Makes all classes available for testing inside __super__ other than super itself
	herb.__super__.this = _.omit(herb, '__super__');;
//

module.exports = herb;
