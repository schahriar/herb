// Modules
var _ = require('lodash');
var stringify = require('json-stringify');
// Source
var group = require('./group');
var color = require('./color');

module.exports = {
	logType: function(config, buffers, arguments, options, callback) {
		// Unify arguments
		arguments = _.toArray(arguments);

		if((config.verbose < options.verbosity)&&(!options.strict)) return null;
		if((config.verbose < options.verbosity)&&(options.strict)) return callback([arguments[0],undefined]);

		if(!options.title) options.title = false;
		
		_.forEach(arguments, function(argument, index, arguments) {
			
			if(_.isString(argument)) {
				argument = color(options.color, (argument));
				argument = argument.replace(/\n/g, '\n' + group.render(options.title, buffers.group.length));
			}
			if((_.isObject(argument))&&(!_.isFunction(argument))) argument = color(options.color, stringify(argument,config.json));
			if((_.isFunction(argument))&&(index!=0)) argument = argument.toString();
			
			arguments[index] = argument;
		});

		// If index 0 is function add group render to index 1
		// Else add it to index 0
		if((buffers.group.length)&&(options.strict)) arguments.splice(1, 0, group.render(options.title, buffers.group.length));
		else if((buffers.group.length)&&(_.isArray(arguments))) arguments.unshift(group.render(options.title, buffers.group.length));
		
		// Prepend time
		var now = new Date();
		now._f = "[" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "] ";
		if((!options.strict)&&(config.prependTime)) arguments.unshift(color("dim",now._f));
		
		callback(arguments);
	},
	count: function(config, buffers, label, options, callback) {
		if(config.verbose < options.verbose) return null;
		
		// Specs: https://developer.mozilla.org/en-US/docs/Web/API/Console.count
		if(!label) label = "";
		if(!buffers.count[label]) buffers.count[label] = 1;
		  else buffers.count[label]++;
		
		callback([group.render(options.title, buffers.group.length),color(options.color, label + ' : ' + buffers.count[label])]);
	}
}
