var _ = require("lodash");
var inspector = require("util").inspect;

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
		var product = new prettify(object);
		
		return product.scan();
	}
}

var prettify = function(object) {
	var _this = this;

	this.object = object;
	this.wrap = {
        	space: function(value) { return space + value + space; },
        	arrayValue: function(value,index,last) {
                	value = value.toString();

                	if(index == 0) value = "[" + value;
                	if(index == last) value = value + "]";
                	return value + ((index<last)?comma:"");
        	},
        	objectValue: function(key, value, padding) {
                	return key.toString() + ":" + _this._repeat(padding+2," ")  + value.toString() + "\n";
       		}
	}
}

prettify.prototype._isTrueObject = function(object){
	return ((_.isObject(object))&&(!_.isArray(object)))
}

prettify.prototype._repeat = function(n, string) {
    n= n || 0;
    return Array(n+1).join(string);
}

prettify.prototype.scan = function(object, depth) {
	depth = depth || 0;
	object = object || this.object;
	
	var _this = this;
	var product = empty;
	var padding = _this._calculatePadding(object);
	
	// If it is an object with Key: Value then send deeper levels one line down
	if(this._isTrueObject(object)) product += newLine;
	
	// Go through object(s)
	_.each(object, function(value, key, scope){
		// Render depth
		if(_this._isTrueObject(scope)) product += _this._repeat(depth,"    ");

		// If Value is an object then go one level deeper & so on
		if(_.isObject(value)) value = _this.scan(value, depth+1);
		
		// If scope is Array then render Array (without Key) otherwise render Object
		if(_.isArray(scope)) product += _this.wrap.arrayValue(value, key, scope.length-1);
		else product += _this.wrap.objectValue(key, value, padding[key]);
	});
	
	// Currently this does not return (this) but I'll soon add that to enable more methods and chaining
	return product;
}

prettify.prototype._calculatePadding = function(object) {
	var padding = 0;
	var paddingObject = {};
	// Go through object
        _.each(object, function(value, key, scope){
		padding = Math.max(padding, key.length);
	});
	_.each(object, function(value, key, scope){
                paddingObject[key] = padding - key.length + 1;
        });
	return paddingObject;
}
