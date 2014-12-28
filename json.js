var object = {
	test:true,
	oneToFive: [1,2,3,4,5],
	down: {
		deep: true,
		aVerylongkeythatshoulddisplay: "yes",
		aVerylongkeythatmustbetoolongtodisplayandshoulddisplayexcerpt: "no",
		deeper: { howDeep: 3 }
	},
	thereCanBeMore: function x(){}
}
var parser = require("./parsers/objects.js").prettyPlease;

//console.log(parsed);
console.log(parser(object));
