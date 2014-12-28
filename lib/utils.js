var _ = require("lodash");

module.exports.isTrueObject = function(object) {
    return (_.isObject(object))&&(!_.isArray(object))
}

module.exports.repeat = function(n, string) {
    n= n || 0;
    return Array(n+1).join(string);
}