var object = {test:true, oneToFive: [1,2,3,4,5], down: { deep: true, aVerylongkeythatshoulddisplay: "yes", deeper: { howDeep: 3 } }}
var parsed = require("util").inspect(object, true, 4, true);
var _ = require("lodash");

function lookdeep(object, deep){
	deep = deep || 0;

	var string = "";
	var space = " ";
	var comma = ",";
	var column = ":";

	var wrap = {
		space: function(value) { return space + value + space; },
		arrayValue: function(value,index,last) {
			value = value.toString();
			
			if(index == 0) value = "[" + value;
			if(index == last) value = value + "]";
			return value + ((index<last)?comma:"");
		},
	}
	if((_.isObject(object))&&(!_.isArray(object))) string += "\n";
	_.each(object, function(value, key, scope){
		// Render depth
		var isTrueObject = ((_.isObject(scope))&&(!_.isArray(scope)));
		if(isTrueObject) string += "    ".repeat(deep);

		if(_.isObject(value)) value = lookdeep(value, deep+1);
	
		if(_.isArray(scope)) string += wrap.arrayValue(value, key, scope.length-1);
		else string += key.toString() + ":\t" + value.toString() + "\n";
	});
	return string;
}

String.prototype.repeat= function(n){
    n= n || 0;
    return Array(n+1).join(this);
}

//console.log(parsed);
console.log(lookdeep(object));
