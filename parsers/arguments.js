// Modules
var _ = require('lodash');
var chalk = require('chalk');
var stringify = require('json-stringify');
// Source
var group = require('./group');

module.exports = {
	logType: function(config, buffers, arguments, options, callback) {
		// Unify arguments
		arguments = _.toArray(arguments);

		if(config.verbose < options.verbose) return null;
		
		if(!options.title) options.title = false;
		
		if(_.isString(arguments[0])) arguments[0] = chalk[options.color](arguments[0]);
		if(_.isObject(arguments[0])) arguments[0] = chalk[options.color](stringify(arguments[0],config.json) );

		if((buffers.group.length)&&(_.isArray(arguments))) arguments.unshift(group.render(options.title, buffers.group.length));
		else if(buffers.group.length) arguments = [group.render(options.title, buffers.group.length), arguments];
		
		callback(arguments);
	},
	count: function(config, buffers, label, options, callback) {
		if(config.verbose < options.verbose) return null;
		
		// Specs: https://developer.mozilla.org/en-US/docs/Web/API/Console.count
		if(!label) label = "";
		if(!buffers.count[label]) buffers.count[label] = 1;
		  else buffers.count[label]++;
		
		callback([group.render(options.title, buffers.group.length),chalk[options.color](label + ' : ' + buffers.count[label])]);
	}
}
