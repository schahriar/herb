![Herbal Logo](logo.png)

Add some true flavour to your **NodeJS** console now with progressbars!
======

**herb** is a magical layer for the most complex of all *verbosities*. To put it in simple words it enables advanced functions missing in the current Node logging system (console.log). **You can group, count, and add progressbars & soon tables** all in *color!* and the best part about it is the fact that you can just replace the global ***console*** with **herb** without further modifications.

## Installation
```javascript
npm install herb
```
or if you are developing a module
```javascript
npm install herb --save
```

## Usage
### Logging
Either
```javascript
var herb = require('herb');

herb.log("An herb log");
herb.warn("An herb warning");
```
Or
```javascript
var console = require('herb');

console.log("An herb log");
console.warn("An herb warning");
// Even
console.count('label');
```

## Methods
**Info, Log, Warn, Error** (color:blue, blue, yellow, red, verbosity:4, 3, 2, 1) -> herb.log(log, json, ...)

**Clear** "Clears console screen" -> herb.clear()

**Count** "Counts to label" -> herb.count(label)
```javascript
herb.count("Apples");
herb.count("Apples");
/// Output:
// Apples : 1
// Apples : 2
```

---------------
**Group, GroupEnd** "Creates a group" -> herb.group(title)
```javascript
herb.group("Fruits");
herb.log("Apples");
herb.log("Oranges");
herb.groupEnd();
herb.warn("Group ended!");
/// Output:
// > Fruits
// | Apples
// | Oranges
// Group ended!
```
---------------
**Time, TimeEnd** "Measure time in ms" -> herb.time(label)
```javascript
herb.time("timeout");
setTimeout(function() { herb.timeEnd("timeout") }, 1200);
/// Output after 1200ms: (the output includes timeout computation time ~ 4ms to 12ms)
// timeout: 1200ms
```

---------------

**Humanify** "Output human friendly json" -> herb.humanify(json)
```javascript
herb.humanify({
	"_id": "54a643971784e5031c7a34a2",
	"index": 3,
	"guid": "37f345d8-de55-46c2-9071-73d0b6982194",
	"isActive": true,
	"name": "Head Schneider"
});
/// Output:
// _id:       54a643971784e5031c7a34a2
// index:     3
// guid:      37f345d8-de55-46c2-9071-73d0b6982194
// isActive:  true
// name:      Head Schneider
```

---------------

**Paragraph** "Output a formatted paragraph" -> herb.paragraph(text)
```javascript
herb.paragraph("Anim magna velit ipsum id et dolor labore. Irure ipsum enim in laborum deserunt elit sit eu sit id et adipisicing eu do. Ad nulla ullamco excepteur consequat veniam ut. Tempor elit excepteur nulla pariatur irure nisi. Nostrud id cupidatat commodo non ex id nostrud amet pariatur.", { alignment: "center", color: "green", width: '50%', margin: '50%' });
/// Outputs a green centered text with half width in the middle of the screen
```

---------------

**Table** "Output a formatted table" -> herb.table({ headers: [...], rows: [[...],[...],...], borders: false })
```javascript
herb.table({
	headers: ['id','name','email','last logged'],
	rows: [
		['1', 'Lorem ipsum', 'lorem@example.com', 'January 1st 2015'],
		['2', '', '', ''],
		['3', 'John Doe', 'info@example.com', 'November 5th 2014']
	],
	borders: false // Full is a table style
});
/// Outputs a green centered text with half width in the middle of the screen
```

---------------
**herb** covers all current console functions and a lot more.
[To prevent TLTR we have moved methods here.](./tutorials/methods.md)

## Config
```javascript
var herb = require('herb');

// Config is dynamic
// You can modify config at any point
herb.config({
  // JSON prettify configs (json)
  json: {
    indent: 4,
    offset: 2 
  },

  // Verbosity of logs (integer)
  // Note that higher numbers cover the entire group e.g. 3 = ['Log','Warn','Error']
  verbose: 3, // 4: Info, 3: Log, 2: Warn, 1: Error, 0: Fatal

  prependTime: false // Prepends time [hour:minute:seconds] to every log if enabled
})
```

## Test Suite
You can do a complex yet boring test by running the following in the source directory:
```javascript
npm install mocha -g
npm test
```
*I'll soon add a visual test.*

## Contributing
The goal is to create a *rich command-line interface experience* for NodeJS.
I am currently looking for active contributors to create **documentation**, **improve** the code and add **innovations** to the module. If you are interested you can contact me directly at <info@schahriar.com>!

## License
MIT © Schahriar SaffarShargh <info@schahriar.com>
