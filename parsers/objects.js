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
	this.object = object;
}

prettify.prototype._wrap = {
	space: function(value) { return space + value + space; },
	arrayValue: function(value,index,last) {
		value = value.toString();

		if(index == 0) value = "[" + value;
		if(index == last) value = value + "]";
		return value + ((index<last)?comma:"");
	},
	objectValue: function(key, value) {
		return key.toString() + ":  " + value.toString() + "\n";
	}
}

prettify.prototype._isTrueObject = function(object){
	return ((_.isObject(object))&&(!_.isArray(object)))
}

prettify.prototype._repeat = function(n){
    n= n || 0;
    return Array(n+1).join(this);
}

prettify.prototype.scan = function(object, depth) {
	depth = depth || 0;
	object = object || this.object;
	
	var product = empty;
	
	// If it is an object with Key: Value then send deeper levels one line down
	if(this._isTrueObject(object)) string += newLine;
	
	// Go through object(s)
	_.each(object, function(value, key, scope){
		// Render depth
		if(isTrueObject(scope)) product += "    ".repeat(depth);

		// If Value is an object then go one level deeper & so on
		if(_.isObject(value)) value = scan(value, depth+1);
	
		// If scope is Array then render Array (without Key) otherwise render Object
		if(_.isArray(scope)) product += this._wrap.arrayValue(value, key, scope.length-1);
		else product += this._wrap(key, value);
	});
	
	// Currently this does not return (this) but I'll soon add that to enable more methods and chaining
	return product;
}