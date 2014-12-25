var decode = require('punycode').ucs2.decode;
module.exports = {
	
	color: function(color, string, isBackground){
		var color = this._raw[color.toLowerCase()];
		if(color) {
			var selector = (isBackground)?'background':'foreground';
			return this._wrap(color[selector], string);
		}else {
			console.warn("Color " + string.toString() + " not found!"); 
		}
	},
	
	background: function(color, string){ this.color(color, string, true) },
	
	spice: function(flavor, string){
		var spice = this._raw.specials[flavor.toLowerCase()];
		if(spice) return this._wrap(spice, string);
		else console.warn("Spice " + string.toString() + " not found!"); 
	},
	
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
		var prepend = (prepend == false)?"":this._bracket;
		// Creates new buffer and decodes command using punnycode		
		this.write(this._decode(prepend+command));
		return this;
	},
	
	_bracket: "[",
	
	_wrap: function(prepend, string){
		return this._decode(this._bracket + prepend + "m" + string.toString() + this._bracket + this._raw.specials.reset + "m");
	},
	
	_decode: function(string){
		// Decodes the string to ucs2 and returns the Buffer with escape code
		return new Buffer([ 0x1b ].concat(decode(string.toString())));
	},
	
	_raw: {
		specials: {
			reset: 0,
			
			bright: 1,
			dim: 2,
			
			hidden : 8,
			reverse: 7,
			
			underscore: 4,
			blink: 5
		},
		
		// Hate to remove Chalk but this seems to do the job
		black: { background: 40, foreground: 30 },
		red: { background: 41, foreground: 31 },
		green: { background: 42, foreground: 32 },
		yellow: { background: 43, foreground: 33 },
		blue: { background: 44, foreground: 34 },
		magenta: { background: 45, foreground: 35 },
		cyan: { background: 46, foreground: 36 },
		white: { background: 47, foreground: 37 },
	}
}