// Modules
var _ = require("lodash");
var culinary = require("culinary");
var cook = culinary.style;
var os = require('os');
var path = require('path');
var fs = require('fs');
// Source
var logType = require('../parsers/log.type');
var timeType = require('../parsers/time.type');
var countType = require('../parsers/count.type');
var lineType = require('../parsers/line.type');
var tableType = require('../parsers/table.type');
var humanify = require('../parsers/json/objects');

module.exports = function(type, arguments, options, modifier, callback) {
	var _this = this;
	// Set scope
	if(_this.__super__) _this = this.__super__;

	// Prevent error if `options` is not defined
	options = options || new Object;

	// Unify arguments
	arguments = _.toArray(arguments);

	var shouldDisplay = ((_this.config.verbose >= options.verbosity)||(options == undefined));

	if(shouldDisplay){
		var parsed = [];

		if(type === 'log') parsed = logType.apply(_this, [arguments, options]);
		else if(type === 'json') parsed = humanify.json.apply(_this, [arguments, options]);
		else if(type === 'time') parsed = timeType.time.apply(_this, [false, arguments, options]);
		else if(type === 'timeEnd') parsed = timeType.time.apply(_this, [true, arguments, options]);
		else if(type === 'count') parsed = countType.apply(_this, [arguments, options]);
		else if(type === 'table') parsed = tableType.apply(_this, [arguments]);
		else if(type === 'line') parsed = lineType.apply(_this, [arguments]);
	}


	// Prepend now
	if((!options.strict)&&(_this.config.prependTime)&&(type !== 'line')) parsed.unshift(timeType.now());

	// If Prefix is provided prefix all logs
	if(_this.config.prefix) parsed.unshift(_this.config.prefix);

	// Reset marker
	if(!_this.markerAttributes.permanent) _this.marker('reset');

	// Log to console
	if(_.isFunction(modifier)) modifier.apply(this, parsed);
	// Passing ~culinary~ as `this` enables easier modifications for one line commands
	if(_.isFunction(callback)) callback.apply(culinary, parsed);

	// Prepare log for writing
	if(type === 'line') parsed = "\t"; /* Lines are console size dependant */

	// If logFile is given
	if((shouldDisplay)&&(_.isString(_this.config.logFile))) {
		// Log to file - Needs more advanced options //

		// Normalize path
		var pathToLogFile = path.normalize(_this.config.logFile);

		fs.appendFile(pathToLogFile, parsed + os.EOL, function (err) {
		  if (err) throw err;
		});
	}

	return this;
}
