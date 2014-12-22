// Modules
var _ = require('lodash');
var chalk = require('chalk');
var stringify = require('json-stringify');
// Clean copy
var native_console = console;

var config = defaults = {
	json: {
		indent: 4,
		offset: 2
	},
	verbose: 3 // 4: Info, 3: Log, 2: Warn, 1: Error
}

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
	   if(config.verbose < 4) return null;
	   if(arguments[0].constructor == String) arguments[0] = chalk.blue(arguments[0]);
	   if(arguments[0].constructor == String) arguments[0] = internals.renderGroups() + arguments[0];
	   if(arguments[0].constructor == Object) arguments[0] = chalk.blue(stringify(arguments[0],config.json) );
	   native_console.info.apply(this, arguments);
	},
	log: function(){
           if(config.verbose < 3) return null;
	   if(arguments[0].constructor == String) arguments[0] = chalk.blue(arguments[0]);
	   if(arguments[0].constructor == String) arguments[0] = internals.renderGroups() + arguments[0];
           if(arguments[0].constructor == Object) arguments[0] = chalk.blue(stringify(arguments[0],config.json));
           native_console.log.apply(this, arguments);
        },
	warn: function(){
	   if(config.verbose < 2) return null;
           if(arguments[0].constructor == String) arguments[0] = chalk.yellow(arguments[0]);
           if(arguments[0].constructor == String) arguments[0] = internals.renderGroups() + arguments[0];
	   if(arguments[0].constructor == Object) arguments[0] = chalk.yellow(stringify(arguments[0],config.json));
           native_console.warn.apply(this, arguments);
        },
	error: function(){
	   if(config.verbose < 1) return null;
	   if(arguments[0].constructor == String) arguments[0] = chalk.red(arguments[0]);
	   if(arguments[0].constructor == String) arguments[0] = internals.renderGroups() + arguments[0];
           if(arguments[0].constructor == Object) arguments[0] = chalk.red(stringify(arguments[0],config.json));
           native_console.error.apply(this, arguments);
	},

	time: function(){
	   native_console.time.apply(this, arguments);
	},
	timeEnd: function(){
	   native_console.timeEnd.apply(this, arguments);
	},
	trace: function(){
	   native_console.trace.apply(this, arguments);
	},
	dir: function(){
	   native_console.dir.apply(this, arguments);
	},
	assert: function(){
	   native_console.assert.apply(this, arguments);
	},
	
	// Extended
	clear: function(){
	   process.stdout.write('\u001B[2J\u001B[0;0f');
	},
	count: function(label){
	   // Specs: https://developer.mozilla.org/en-US/docs/Web/API/Console.count
	   if(!label) label = "";
	   if(!buffers.count[label]) buffers.count[label] = 1;
	     else buffers.count[label]++;
	   
	   native_console.log.apply(this, [chalk.blue(label + ' : ' + buffers.count[label])]);
	},
	group: function(label){
	   buffers.group.push('label');
	   native_console.log(internals.renderGroups() + chalk.bold(label));
	},
	groupEnd: function(){
	   // Remove last element from the array
	   buffers.group.pop();
	}
}

var internals = {
	renderGroups: function(){
		var cString = "";
		var template = "| ";
		buffers.group.forEach(function(){ cString += template  });
		
		return cString;
	}
}
