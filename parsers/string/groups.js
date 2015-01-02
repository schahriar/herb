var cook = require("culinary").style;

module.exports = {
	render: function(isTitle, length){
		var cString = "";
		var template = "| ";
		
		var i = 0;
		
		if(isTitle) i = 1;
		for(i=i; i<length; i++){ cString += template }
		if(isTitle) cString += "> ";
		
		return cook(cString).spice("bold", "dim");
	}
}
