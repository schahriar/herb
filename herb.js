// Modules
var _ = require('lodash');
var chalk = require('chalk');
// Source
var culinary = require('./lib/culinary');
var parse = require('./lib/arguments');
var progress = require('./lib/progress');
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

module.exports = {
	_columns: function(){ return process.stdout.columns },
	_rows: function(){ return process.stdout.rows },

	config: function(userConfig){
		// Made verbose & verbosity attributes flexible
		if((_.isNumber(userConfig.verbosity))&&(!userConfig.verbose)) userConfig.verbose = userConfig.verbosity;
		
	   _.defaults(userConfig, defaults);
	   _.defaults(userConfig, config);
	   config = userConfig;
	},

	parse: function(){
		parse.logType(config, buffers, arguments, { verbosity: 0, color: 'blue', strict: true }, function(parsed){
			var callback = parsed.shift();
			callback.apply(this, parsed);
                });
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
	culinary: culinary,
	
	clear: culinary.clearScreen,
	clearLine: function(){
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
	},
	writeLine: function(){
		process.stdout.cursorTo(0);
		parse.logType(config, buffers, arguments, { verbosity: 2, color: 'cyan' }, function(parsed){
			process.stdout.write(parsed[0]);
		});
	},
	progress: progress,
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
