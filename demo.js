var herb = require("./herb");

var log = herb.template('log', 'blue', 'white', 'dim', 'bold')

var fs = require('fs');
//console.log(fs.readFileSync('./log', {encoding: 'utf8'}));
console.log("\n");
herb.line('_');
// Or combine multiple characters
herb.marker({ color: 'magenta' }).line('<-->');

herb.config({
	logFile: './log',
	prependTime: true,
	prefix: '# '
});

herb.humanify({
	"_id": "54a643971784e5031c7a34a2",
	"index": 3,
	"guid": "37f345d8-de55-46c2-9071-73d0b6982194",
	"isActive": true,
	"name": "Head Schneider"
});

herb.marker({ color: 'magenta' }).line('-');
herb.log({ this: "A LARGE TEST!" });
herb.clearLine().log("ONE MORE!");
herb.error("Big ERROR!");
herb.marker({ color: 'magenta' }).line('<-->');
herb.table({
	headers: ['id','name','email','last logged'],
	rows: [
		['1', 'Schahriar SFR', 'info@schahriar.com', 'January 1st 2015'],
		['2'],
		['3', 'TEST USER', 'test@example.com', 'November 5th 2014']
	],
	full: false
});

log('test', {}, '', '')

herb.paragraph("Anim magna velit ipsum id et dolor labore. Irure ipsum enim in laborum deserunt elit sit eu sit id et adipisicing eu do. Ad nulla ullamco excepteur consequat veniam ut. Tempor elit excepteur nulla pariatur irure nisi. Nostrud id cupidatat commodo non ex id nostrud amet pariatur.", { alignment: "center", color: "green", width: '50%', margin: '50%' });
herb.log(herb.green('SUCCESS'), herb.underline('www.example.com'))
