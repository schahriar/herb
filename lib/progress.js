var eventEmmiter = require('events').EventEmitter;
var util         = require("util");
var _ = require("lodash");
var chalk = require("chalk");

var PROGRESS = function(options){
	eventEmmiter.call(this);
	
	if(!options) options = {};
	
	var defaults = {
		title: "",
		start: 0,
		
		bg: "cyan",
		fg: "hidden"
	}

	_.defaults(options, defaults);

	var availableColors = ["black","white", "gray", "dim" ,"red","green","yellow","blue","magenta","cyan","reset"];
	if(availableColors.indexOf(options.fg) < 0) options.fg = "bold";
	if(availableColors.indexOf(options.bg) < 0) options.bg = "blue";

	this.title = options.title;
	this.fg = options.fg;
	this.bg = "bg" + options.bg.charAt(0).toUpperCase() + options.bg.slice(1);
}

util.inherits(PROGRESS, eventEmmiter);

PROGRESS.prototype.set = function(to){
	if(to>100) to = 100;
	if(to<0) to = 0;
	
	if(!this.last) this.last = 0;
	if(Math.round(this.last) > Math.round(to)) {
		this._render(to);
		if(this._nCalled) this._nCalled++;
			else this._nCalled = 0;
	}
}

PROGRESS.prototype._render = function(to){
	var _this = this;

	var from = 0;
	if(_this.last <= to) from = _this.last;
	else {
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		if(_this.title != "") process.stdout.write("\n  " + chalk[_this.fg](_this.title));
		process.stdout.write("\n  ");
	}
	
	var width = process.stdout.columns - 4;
        var max = Math.round((width / 100) * to);
        var current = Math.round((width /100) * from);

	_this.last = to;
	//console.log(max, current);
	function loop(value, to){
		++value;
		
		if(value >= process.stdout.columns-4) {
                        //console.log(_this.width, _this.current);
                        process.stdout.write("\n\n");
                        _this.emit('done', this._nCalled);
                }
		else if(value <= to) { process.stdout.write(chalk[_this.bg](" ")); setTimeout(function(){ return loop(value, to) }, 50) }
	}
	loop(current, max);
}

module.exports = PROGRESS;
