var _ = require("lodash");
var utils = require("../lib/utils");

var alignment = function(string, align) {
	var width = process.stdout.columns;
	var words = utils.breakWords(string);
	var lines = [];
	
	_.each(words, function(word, key){
		var currentLine = (!lines.length)?0:lines.length-1;
		var currentLength = (lines[currentLine])?lines[currentLine].length:0;
		
		if((currentLength + word.length) < width) {
			// If current line has available space add words
			lines[currentLine] += word + utils.char.space;
		}
		else {
			// Otherwise wrap up the line to the alignment
			var padding = (width - lines[currentLine].length);
			if(padding > 0) {
				if(align === "right") lines[currentLine] = utils.repeat(padding, utils.char.space) + lines[currentLine];
				if(align === "center") lines[currentLine] = utils.repeat(padding/2, utils.char.space) + lines[currentLine];
			}
			// And move to the next line
			lines.push(word + utils.char.space);
		}
	});
	
	return lines.join(utils.char.newLine);;
}

module.exports = alignment;