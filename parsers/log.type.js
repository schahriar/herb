// Modules
var _ = require("lodash");
var culinary = require("culinary");
var cook = culinary.style;
// Source
var utils = require("../lib/utils");
var group = require("./string/groups");
var stringify = require("./json/objects").render;
var alignment = require('./string/alignment');

module.exports = function(arguments, options) {
	var _this = this;

	var config = _this.config;
	var buffers = _this.buffers;
	var spices = [];
	
	if((options.paragraph)&&(_.isObject(arguments[arguments.length-1]))) _.defaults(options, arguments.pop());

	if(_this.markerAttributes.background) spices.push(_this.markerAttributes.background);
		else if(options.background) spices.push(options.background);
	if(_this.markerAttributes.color)      spices.push(_this.markerAttributes.color);
		else if(options.color) spices.push(options.color);
	if(_this.markerAttributes.style)      spices.push(_this.markerAttributes.style);
		else if(options.style) spices.push(options.style);

	if((config.verbose < options.verbosity)&&(!options.strict)) return arguments;
	if((config.verbose < options.verbosity)&&(options.strict)) return arguments;

	if(!options.title) options.title = false;

	_.forEach(arguments, function(argument, index, arguments) {
		var original = argument;

		if(_.isString(argument)) {
			argument = argument.replace(/\n/g, '\n' + group.render(options.title, buffers.group.length));

			if(_.isString(options.alignment)) argument = alignment(original, options.alignment, options.width, options.margin);

			argument = cook.apply({
					string: argument
			}, spices);
		}
		if((_.isObject(argument))&&(!_.isFunction(argument))) {
			argument = cook.apply({
				string: stringify(argument,config.json)
			}, spices);
		}
		if((_.isFunction(argument))&&(index!=0)) argument = argument.toString();

		arguments[index] = argument;
	});

	// Do not prepend to paragraphs
	if(!options.paragraph) {
		// If index 0 is function add group render to index 1
		// Else add it to index 0
		if((buffers.group.length)&&(options.strict)) arguments.splice(1, 0, group.render(options.title, buffers.group.length));
		else if((buffers.group.length)&&(_.isArray(arguments))) arguments.unshift(group.render(options.title, buffers.group.length));
	}

	return arguments;
}