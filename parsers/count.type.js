// Modules
var cook = require('culinary').style;
// Source
var group = require("./string/groups");

module.exports = function(label, options){
	
	var config = this.config;
	var buffers = this.buffers;
		
	// Specs: https://developer.mozilla.org/en-US/docs/Web/API/Console.count
	if(!label) label = "";
	if(!buffers.count[label]) buffers.count[label] = 1;
	  else buffers.count[label]++;

	
	return [
		group.render(options.title, buffers.group.length),
		cook(label + ' : ' + buffers.count[label]).spice(options.color)
	];
}