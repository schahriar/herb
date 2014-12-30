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
			return parse.logType.apply(this, [arguments, { verbosity: 0, color: 'blue', strict: true }, undefined, function(parsed){
				var callback = parsed.shift();
				callback.apply(this.__super__, parsed);
			}]);
        },
		
		config: function(userConfig){
			// Made verbose & verbosity attributes flexible
				if((_.isNumber(userConfig.verbosity))&&(!userConfig.verbose)) userConfig.verbose = userConfig.verbosity;

			_.defaults(userConfig, defaults);
			_.defaults(userConfig, config);
			config = userConfig;
        },
		
		markerAttributes: {
			background: undefined,
			color: undefined,
			style: undefined,
		
			verbosity: undefined
		},
		
		// Marker allows for modification of each log
		marker: function(attributes, isPermanent) {
			if(isPermanent) attributes.permanent = true;
			if(attributes === 'reset') this.markerAttributes = {
				background: undefined,
                        	color: undefined,
                        	style: undefined,

                        	verbosity: undefined
			}; else _.defaults(this.__super__.markerAttributes, attributes);
			return this;
		},

		getBuffers: function() { return buffers },
		getConfig: function(){ return config }
	},
	
	info: function(){
		return parse.logType.apply(this, [arguments, { verbosity: 4, color: 'blue' }, native_console.info]);
	},
	log: function(){
		return parse.logType.apply(this, [arguments, { verbosity: 3, color: 'blue' }, native_console.log]);
	},
	warn: function(){
		return parse.logType.apply(this, [arguments, { verbosity: 2, color: 'yellow' }, native_console.warn]);
	},
	error: function(){
		return parse.logType.apply(this, [arguments, { verbosity: 1, color: 'red' }, native_console.error]);
	},

	time: function(){ native_console.time.apply(this, arguments) },
	timeEnd: function(){ native_console.timeEnd.apply(this, arguments) },
	trace: function(){ native_console.trace.apply(this, arguments) },
	dir: function(){ native_console.dir.apply(this, arguments) },
	assert: function(){ native_console.assert.apply(this, arguments) },

	// Extended	
	clear: culinary.clearScreen,
	clearLine: culinary.eraseLine,
	center: function(){
		return parse.logType.apply(this, [arguments, { verbosity: 2, color: 'cyan', alignment: 'center' }, native_console.log, function() {
			culinary.scrollDown();
		}])
	},
	right: function(){
		return parse.logType.apply(this, [arguments, { verbosity: 2, color: 'cyan', alignment: 'right' }, native_console.log, function() {
			culinary.scrollDown();
		}])
	},
	left: function(){
		return parse.logType.apply(this, [arguments, { verbosity: 2, color: 'cyan', alignment: 'left' }, native_console.log, function() {
			culinary.scrollDown();
		}])
	},
	count: function(label){
		return parse.count(config, buffers, label, { color: 'blue' }, function(parsed){
			native_console.log.apply(this, parsed);
			return this;
		});
	},
	group: function(label){
		buffers.group.push('label');
		return parse.logType.apply(this, [[label], { verbosity: 2, style: 'bold', title: true }, native_console.log]);
	},
	groupEnd: function(){
		// Remove last element from the array
		buffers.group.pop();
		return this;
	}
}

// Aliases
	herb.config = herb.__super__.config;
	herb.marker = herb.__super__.marker;
	// Makes all classes available for testing inside __super__ other than super itself
	herb.__super__.this = _.omit(herb, '__super__');;
//

module.exports = herb;
