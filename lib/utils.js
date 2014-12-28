var _ = require("lodash");

module.exports.isTrueObject = function(object) {
    return (_.isObject(object))&&(!_.isArray(object))
}

module.exports.repeat = function(n, string) {
    n= n || 0; // if undefined then set to 0
    n= (n<0)?0:n; // Keep value of n positive
    n= Math.round(n); // Round up n
    return Array(n+1).join(string);
}

module.exports.breakWords = function(string) {
    if(string.length = 0) return [];
	return string.split(' ');
}

module.exports.char = {
	space: " ",
	empty: "",
	newLine: "\n"
}