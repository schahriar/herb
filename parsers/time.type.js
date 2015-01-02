// Modules
var _ = require("lodash");
var culinary = require("culinary");
var cook = culinary.style;
// Source
var group = require("./string/groups");

module.exports = { 
	time: function(hasEnded, label, options){
	if(!label) label = "";
	
	var config = this.config;
	var buffers = this.buffers;
	
	if(hasEnded) {
		return [
			group.render(options.title, buffers.group.length),
			cook(label
				 + ': '
				 + ( new Date().getTime() - buffers.time[label] ) + 'ms').spice(options.color)
		];
	}else{
		buffers.time[label] = new Date().getTime();
		return undefined;
	}
	if(!buffers.count[label]) buffers.count[label] = 1;
	  else buffers.count[label]++;
	},
	
	now: function(time){
		var now = new Date();
		
		// If time is defined assign it to now
		if(_.isDate(time)) now = time;
		
		var hour = now.getHours();
		var minute = (now.getMinutes() < 10)?("0" + now.getMinutes()): now.getMinutes();
		var second = (now.getSeconds() < 10)?("0" + now.getSeconds()): now.getSeconds();
		
		return cook("[" + hour + ":" + minute + ":" + second + "] ").spice("dim");
	}
}