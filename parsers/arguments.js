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
	}
}
