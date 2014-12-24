var eventEmmiter = require('events').EventEmitter;
var util         = require("util");
var chalk = require("chalk");

var PROGRESS = function(options){
	eventEmmiter.call(this);
	
	if(!options.start) 
}

util.inherits(PROGRESS, eventEmmiter);

PROGRESS.prototype.set = function(value){
	var _this = this;
	
	process.stdout.clearLine();
	process.stdout.write("  ");
	function loop(value){
		var max = (process.stdout.columns-4 / 100) * value;
		if(value <= 100) { process.stdout.write(chalk.cyan("■")); return loop(value) }
		else { process.stdout.write("\n"); _this.emit('done'); }
	}
}

module.exports = PROGRESS;