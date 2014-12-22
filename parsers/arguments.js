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

		if(config.verbose < options.verbose) return null;
		
		if(!options.title) options.title = false;
		
		_.forEach(arguments, function(argument, index, arguments) {
			
			if(_.isString(argument)) {
				argument = color(options.color, (argument));
				argument = argument.replace(/\n/g, '\n' + group.render(options.title, buffers.group.length));
			}
			if(_.isObject(argument)) argument = color(options.color, stringify(argument,config.json));
			
			arguments[index] = argument;
		});

		if((buffers.group.length)&&(_.isArray(arguments))) arguments.unshift(group.render(options.title, buffers.group.length));
		
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
