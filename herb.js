// Modules
var _ = require('lodash');
// Source
var parse = require('./parsers/arguments');
// Clean copy
var native_console = console;

var config = defaults = {
	json: {
		indent: 4,
		offset: 2
	},
	verbose: 3 // 4: Info, 3: Log, 2: Warn, 1: Error
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
	   _.defaults(userConfig, defaults);
	   config = userConfig; 
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
	clear: function(){
		process.stdout.write('\u001B[2J\u001B[0;0f');
	},
	clearLine: function(){
		process.stdout.clearLine();
	},
	writeLine: function(){
		process.stdout.cursorTo(0);
		process.stdout.write(arguments[0]);
	},
	count: function(label){
		parse.count(config, buffers, label, { color: 'blue' }, function(parsed){
			native_console.log.apply(this, parsed);
		});
	},
	group: function(label){
		buffers.group.push('label');
		parse.logType(config, buffers, [label], { verbosity: 0, color: 'bold', title: true }, function(parsed){
			native_console.log.apply(this, parsed);
		});
	},
	groupEnd: function(){
	   // Remove last element from the array
	   buffers.group.pop();
	}
}
