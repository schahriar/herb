var _ = require("lodash");
var utils = require("../lib/utils");
var inspector = require("util").inspect;
var cook = require("culinary").style;

// Bunch of defaults
var empty = "", space = " ", comma = ",", column = ":", newLine = "\n";

module.exports = {
	render: function(object, options){
		var depth = options.depth || 4; // null for infinite
		var showHidden = options.showHidden || true;
		var hasColor = options.hasColor || true;
		
		return inspector(object, showHidden, depth, hasColor);
	},
	prettyPlease: function(object){
		var product = new humanify(object);
		return product.scan()+newLine;
	}
}

var humanify = function(object) {
	var _this = this;

	this.object = object;
	this.wrap = {
        	space: function(value) { return space + value + space; },
        	arrayValue: function(value,index,last) {
                	value = this.color(value);

                	if(index == 0) value = "[" + value;
                	if(index == last) value = value + "] ";
                	return value + ((index<last)?comma:"");
        	},
        	objectValue: function(key, value, padding) {
                	return cook(key.toString()).spice("cyan") + ":" + utils.repeat(padding+2," ")  + this.color(value)  + "\n";
       		},
		color: function(value){
			var styles = [];
			value = value.toString();

			if((value == "true")||(value == "false")) styles.push("green");
			else if(!isNaN(value)) styles.push("yellow");
			else if(value.match(/^[\[Function]+/) == "[Function") styles.push("bgWhite","red")
			else styles.push("dim");
			return (styles.length)?(cook.apply({string:value},styles)):value;
		}
	}
}

humanify.prototype.scan = function(object, depth) {
	depth = depth || 0;
	object = object || this.object;
	
	var _this = this;
	var padding = 1;
	var product = empty;
	
	// If it is an object with Key: Value
	if(utils.isTrueObject(object)){
		// then send deeper levels one line down
		product += newLine;
		// and calculate total padding to unify the looks
		padding = _this._calculatePadding(object);
		object = padding[1];
		padding = padding[0];
	}
	
	// Go through object(s)
	_.each(object, function(value, key, scope){
		if(value.constructor === Function) value = "[Function: " + value.name + "]";
		// Render depth
		if(utils.isTrueObject(scope)) product += utils.repeat(depth,"    ");

		// If Value is an object then go one level deeper & so on
		if(_.isObject(value)) value = _this.scan(value, depth+1);
		
		// If scope is Array then render Array (without Key) otherwise render Object
		if(_.isArray(scope)) product += _this.wrap.arrayValue(value, key, scope.length-1);
		else product += _this.wrap.objectValue(key, value, padding[key]);
	});
	
	// Currently this does not return (this) but I'll soon add that to enable more methods and chaining
	return product.slice(0,-1);
}

humanify.prototype._calculatePadding = function(object) {
	var padding = 0;
	var paddingObject = {};
	// Go through object
        _.each(object, function(value, key, scope){
		padding = Math.max(padding, key.length);
	});
	// Set a max padding length
	padding = Math.min(30, padding);
	_.each(object, function(value, key, scope){
		if(key.length > padding){ 
			var newKey = key.substring(0,27) + "...";
			object[newKey] = value;
			delete object[key];

			paddingObject[newKey] = padding - newKey.length;
		}else paddingObject[key] = padding - key.length;
        });
	return [paddingObject,object];
}
