var eventEmmiter = require('events').EventEmitter;
var util         = require("util");
var _ = require("lodash");
var culinary = require("culinary");
var output = culinary.style;

var PROGRESS = function(options){
	eventEmmiter.call(this);
	
	if(!options) options = {};
	
	var defaults = {
		title: "",
		start: 0,
		
		bg: "white",
		fg: "green",
		color: "reset"
	}

	_.defaults(options, defaults);

	var availableColors = ["black","white","red","green","yellow","blue","magenta","cyan","reset"];
	if(availableColors.indexOf(options.fg) < 0) options.fg = defaults.fg;
	if(availableColors.indexOf(options.bg) < 0) options.bg = defaults.bg;
	if(availableColors.indexOf(options.color) < 0) options.color = defaults.color;

	this._nCalled = 0;
	this._visible = false;

	this.title = options.title;
	this.color = options.color;
	this.fg = (options.fg != 'reset')?("bg" + options.fg.charAt(0).toUpperCase() + options.fg.slice(1)):'reset';
	this.bg = (options.bg != 'reset')?("bg" + options.bg.charAt(0).toUpperCase() + options.bg.slice(1)):'reset';
}

util.inherits(PROGRESS, eventEmmiter);

PROGRESS.prototype.set = function(to){
	var _this = this;

	to = Math.round(to);

	if(to>100) return null;
	if(to<0) return null;;
	
	if(!this.last) this.last = 0;
	
	if(_this.last < to) {
		_this._nCalled++;
		_this._render(to);
	}
}

PROGRESS.prototype._render = function(to){
	var _this = this;

	var width = process.stdout.columns - 14;

	var from = 0;
	if(_this.last <= to) from = _this.last;
	if(!_this._visible) {
		culinary.eraseLine().cursorTo(0);
		
		if(_this.title != "") process.stdout.write("\n  " + output(_this.title).addStyles(_this.color,"bold") + "\n");
		culinary.cursorTo(12).write(repeat(output(" ").addStyles(_this.bg), width)).cursorTo(12);
		
		_this._visible = true;
	}else{
		culinary.save().down(1).cursorTo(2);
		culinary.write("[ " + to.toString() + "% ]");
		culinary.restore() // Restore cursor position
	}
	
        var max = Math.round((width / 100) * to);
        var current = Math.round((width /100) * from);

	_this.last = to;
	
	var length = max - current;
	if(length>width) length = width;

	culinary.write(output(repeat(" ", length)).addStyles(_this.fg));

	if((max >= width)||(to >= 100)) {
		culinary.write("\n\n\n");
                _this.emit('done', _this._nCalled);
        }
}

var repeat = function(string, n){
    n= n || 0;
    n= (n<0)?0:n;
    return Array(n+1).join(string);
}

module.exports = PROGRESS;
