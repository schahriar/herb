var _ = require("lodash");
var utils = require("../lib/utils");

var alignment = function(string, align) {
	var width = process.stdout.columns;
	var words = utils.breakWords(string);
	var lines = [utils.char.empty];

	// Go through words
	_.each(words, function(word, index, array){
		var currentLine = (!lines.length)?0:lines.length-1;
		var currentLength = (lines[currentLine])?lines[currentLine].length:0;
			
		if((currentLength + word.length) < width) {
			// If current line has available space add words
			lines[currentLine] = lines[currentLine] + word + ((array.length-1 > index)?" ":"");
		}
		else {
			// Fill the space
			lines[currentLine] += utils.repeat(width - currentLength, utils.char.space);
			// Otherwise move to the next line
			lines.push(word + " ");
		}
	})
	// Go through lines
	_.each(lines, function(line, index){
		// Wrap up the line to the alignment
                var padding = (width - line.length);
                
                if(padding > 0) {
                	if(align == "right") lines[index] = utils.repeat(padding, utils.char.space) + line;
                	if(align == "center") lines[index] = utils.repeat(padding/2, utils.char.space) + line;
                }
	});
	
	lines.push("");
	return lines.join(utils.char.newLine);
}

module.exports = alignment;
