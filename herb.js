// Modules
var _ = require("lodash");
var culinary = require('culinary');
// Source
var __super__ = require('./lib/super');
var parse = require('./lib/arguments');
// Clean copy
var native_console = console;

var herb = {
	__super__ : __super__,

	info:     function(){ return parse.apply(this, ['log',  arguments, { verbosity: 4, color: 'blue' },   native_console.info])  },
	log:      function(){ return parse.apply(this, ['log',  arguments, { verbosity: 3, color: 'blue' },   native_console.log])   },
	warn:     function(){ return parse.apply(this, ['log',  arguments, { verbosity: 2, color: 'yellow' }, native_console.warn])  },
	error:    function(){ return parse.apply(this, ['log',  arguments, { verbosity: 1, color: 'red' },    native_console.error]) },

	write: function(){ return parse.apply(this, ['log',  arguments, { verbosity: 1, color: 'red' },    function(){
		culinary.eraseLine().write(_.toArray(arguments).join(' ') + '\n');
	}]) },

	humanify: function(){ return parse.apply(this, ['json', arguments, { verbosity: 3 },                  native_console.log])   },

	//-  Timers  -//
	time: function(label){ return parse.apply(this, ['time', [label], { verbosity: 0 }]) },
	timeEnd: function(label){ return parse.apply(this, ['timeEnd', [label], { color: 'green', verbosity: 0 }, native_console.log]) },
	/// ------- ///

	// Extended
	clear: function() { culinary.clearScreen(); return this },
	clearLine: function() { culinary.up(1).eraseLine(); return this },

	line: function(){ return parse.apply(this, ['line', arguments, { verbosity: 1 }, native_console.log]) },
	table: function(){ return parse.apply(this, ['table', arguments, { verbosity: 1 }, native_console.log]) },

	paragraph: function(){ return parse.apply(this, ['log', arguments, { paragraph: true, verbosity: 3 }, native_console.log, culinary.scrollDown]) },

	count: function(label){ return parse.apply(this, ['count', [label], { color: 'blue', verbosity: 3 }, native_console.log]) },
	group: function(label){
		__super__.buffers.group.push('label');
		return parse.apply(this, ['log', [label], { verbosity: 1, style: 'bold', title: true }, native_console.log]);
	},
	groupEnd: function(){
		// Remove last element from the array
		__super__.buffers.group.pop();
		return this;
	},

	//-  Defaults  -//
	trace: function(){ native_console.trace.apply(this, arguments) },
	dir: function(){ native_console.dir.apply(this, arguments) },
	assert: function(){ native_console.assert.apply(this, arguments) },
	/// --------- ///

	template: function(type){
		var options = Array.prototype.slice.call(arguments);
		return function(){
			var array = [];
			var args = Array.prototype.slice.call(arguments);
			options.forEach(function(item, index){
				if(index == 0) return false;
				try {
					if(args[index-1])
						array.push(herb[item](args[index-1]));
					else
						array.push(' ')
				}catch(e){}
			})
			herb[type].apply(herb, array);
		}
	}
}

var styles = ['black','red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'dim', 'bold', 'invert', 'italic', 'underline', 'strikethrough', 'hidden', 'bgBlack', 'bgWhite', 'bgGreen', 'bgBlue', 'bgCyan', 'bgMagenta', 'bgRed', 'bgYellow'];

styles.forEach(function(spice, name){
	herb[spice] = function(string){
		if(!string) return false;
		if((string.constructor === Object) || string.constructor === Array) string = JSON.stringify(string);
		if(string.length < 1) string = '';
		if(string === null) string = 'null';

		return culinary.style(string).spice(spice)
	}
})

// Aliases
	herb.getSize = culinary.getSize
	herb.config  = __super__.setConfig,
	herb.marker  = __super__.marker;
	herb.parse   = __super__.parse;
//

module.exports = herb;
