var _ = require("lodash");
var utils = require("../../lib/utils");
var group = require("./groups");

var alignment = function(string, align, givenWidth, margin) {
	var width = utils.width() - 2; // The -2 fixes a problem in the code below
	var words = utils.breakWords(string);
	
	if((margin)&&(!_.isNumber(margin))&&(margin.slice(-1) === '%')) {
		margin = Math.round((width/100) * parseFloat(margin.slice(0, -1)));
	}else if(!_.isNumber(margin)) margin = 0;
	
	if((givenWidth)&&(givenWidth.slice(-1) === '%')) {
		width = Math.round((width/100) * parseFloat(givenWidth.slice(0, -1)));
	}else if(_.isNumber(givenWidth)) width = givenWidth;
	
	var lines = [utils.repeat(margin/2, utils.char.space)];

	// Go through words
	_.each(words, function(word, index, array){
		var currentLine = (!lines.length)?0:lines.length-1;
		var currentLength = (lines[currentLine])?lines[currentLine].length:0;
			
		if((currentLength + word.length) < width + margin/2) {
			// If current line has available space add words
			lines[currentLine] = lines[currentLine] + word + ((array.length-1 > index)?" ":"");
		}
		else {
			// Otherwise move to the next line
			lines.push(utils.repeat(margin/2, utils.char.space) + word + " ");
		}
	})
	// Go through lines
	_.each(lines, function(line, index){
				// Wrap up the line to the alignment
                var padding = (width - (line.length - margin/2));
                
                if(padding > 0) {
                	if(align == "right") lines[index] = utils.repeat(padding, utils.char.space) + line;
                	if(align == "center") lines[index] = utils.repeat(padding/2, utils.char.space) + line;
                }
	});
	
	lines.push("");
	return lines.join(utils.char.newLine);
}

module.exports = alignment;
