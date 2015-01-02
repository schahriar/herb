var herb = require("./herb");
var fs = require('fs');
//console.log(fs.readFileSync('./log', {encoding: 'utf8'}));
herb.config({
	logFile: './log',
	prependTime: true
});

herb.marker({ color: 'magenta' }).line('-');
herb.log({ this: "A LARGE TEST!" });
herb.error("Big Time FUCK UP!");
herb.marker({ color: 'magenta' }).line('<-->');
herb.table({
	headers: ['id','name','email','last logged'],
	rows: [
		['1', 'Schahriar SFR', 'info@schahriar.com', 'January 1st 2015'],
		['2'],
		['3', 'Hamid SaffarShargh', 'info@ocecan.com', 'November 5th 2014']
	],
	full: false
});