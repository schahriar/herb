// Modules
var _ = require("lodash");
var culinary = require("culinary");
var cook = culinary.style;
// Source
var utils = require("../lib/utils");
var group = require("./groups");
var stringify = require("./objects").render;
var alignment = require('./alignment');
var count = require('./count');
var time = require('./time');

module.exports = {
	logType: function(arguments, options, callback) {
		console.log(this.marker);
		var config = this.config;
		var buffers = this.buffers;
		// Unify arguments
		arguments = _.toArray(arguments);

		if((config.verbose < options.verbosity)&&(!options.strict)) return null;
		if((config.verbose < options.verbosity)&&(options.strict)) return callback([arguments[0],undefined]);

		if(!options.title) options.title = false;
		
		_.forEach(arguments, function(argument, index, arguments) {
			var original = argument;

			if(_.isString(argument)) {
				argument = argument.replace(/\n/g, '\n' + group.render(options.title, buffers.group.length));
			
				if(_.isString(options.alignment)) argument = alignment(original, options.alignment);
				argument = cook(argument).spice(options.color);
			}
			if((_.isObject(argument))&&(!_.isFunction(argument))) argument = cook(stringify(argument,config.json)).spice(options.color);
			if((_.isFunction(argument))&&(index!=0)) argument = argument.toString();
			
			arguments[index] = argument;
		});

		// If index 0 is function add group render to index 1
		// Else add it to index 0
		if((buffers.group.length)&&(options.strict)) arguments.splice(1, 0, group.render(options.title, buffers.group.length));
		else if((buffers.group.length)&&(_.isArray(arguments))) arguments.unshift(roup.render(options.title, buffers.group.length));
		
		// Prepend time
		if((!options.strict)&&(config.prependTime)) arguments.unshift(time(cook));
		
		callback(arguments);
	},
	count: function(config, buffers, label, options, callback) {
		count(cook, config, buffers, label, options, callback);
	}
}
