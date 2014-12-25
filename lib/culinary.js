var decode = require('punycode').ucs2.decode;
module.exports = {
	escape: "\033",
	
	write: function(string) {
		process.stdout.write(string);
		return this;
	},
	
	up: function(integer){ return this.execute(integer + "A") },
	
	down: function(integer){ return this.execute(integer + "B") },
	
	back: function(integer){ return this.execute(integer + "D") },
	
	forth: function(integer){ return this.execute(integer + "C") },
	
	scrollUp: function(){ return this.execute("D", false) },
	scrollDown: function(){ return this.execute("M", false) },
	
	nextLine: function(){ return this.execute("E", false) },
	
	save: function(){ return this.execute("s") },
	restore: function(){ return this.execute("u") },

	custom: function(character, prepend, append, hasAttributes){ return this.execute(prepend + character + append, hasAttributes) },

	clearScreen: function(direction){
		var directionCodes = {
			up: 1,
			down: 0,
			entire: 2
		}
		
		if(!direction) direction = "entire";
		
		return this.execute(directionCodes[direction] + "J");
	},
	
	eraseLine: function(direction){
		var directionCodes = {
			left: 1,
			right: 0,
			entire: 2
		}
		
		if(!direction) direction = "entire";
		
		return this.execute(directionCodes[direction] + "K");
	},
							
	execute: function(command, prepend){
		var prepend = (prepend == false)?"":"[";
		// Creates new buffer and decodes command using punnycode		
		this.write(new Buffer([ 0x1b ].concat(decode(prepend+command))));
		return this;
	}	
}
