var object = {test:true, oneToFive: [1,2,3,4,5], down: { deep: true, aVerylongkeythatshoulddisplay: "yes", deeper: { howDeep: 3 } }}
var parser = require("parsers/objects.js");

//console.log(parsed);
console.log(parser(object));