// Modules
var _ = require("lodash");
var culinary = require("culinary");
var cook = culinary.style;
// Source
var utils = require("../lib/utils");

module.exports = function(arguments) {
	character = arguments.join();
	character = (_.isString(character))?character:"_";
	var spices = [];
	
	if(this.markerAttributes.background) spices.push('bg' + this.markerAttributes.background);
	if(this.markerAttributes.color)      spices.push(this.markerAttributes.color);
	if(this.markerAttributes.style)      spices.push(this.markerAttributes.style);
	
	var total = Math.floor(utils.width(true)/character.length);
	var remaining = utils.width(true) - (total * character.length);

	return [cook.apply({
					string: utils.repeat(total, character) + character.substring(0,remaining)
	}, spices)];
}