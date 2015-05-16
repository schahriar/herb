![Herbal Logo](logo.png)

Add some true flavour to your **NodeJS** console!
======

**herb** is a magical layer for the most complex *logs*. To put it in simple words it enables advanced functions missing in the current Node logging system (console.log). **You can group, count, and add lines, paragraphs or tables** all in *color!* and the best part about it is the fact that you can just replace the global ***console*** with **herb** without further modifications!

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

## Colors & Styles
All [Culinary](https://www.npmjs.com/package/culinary) styles and colors are supported!
e.g.
```
herb.log(herb.green('SUCCESS'), herb.underline('www.example.com'))
```
- **Colors:** Black, White, Green, Blue, Cyan, Magenta, Red, Yellow
- **Backgrounds:** bgBlack, bgWhite, bgGreen, bgBlue, bgCyan, bgMagenta, bgRed, bgYellow
- **Spices:** bold, underline, ~~strikethrough~~ *(barely supported by clients)*, italic, **hidden**, invert, reset

## Methods
**Info, Log, Warn, Error** (color:blue, blue, yellow, red, verbosity:4, 3, 2, 1) -> herb.log(log, json, ...)

**Clear** "Clears console screen" -> herb.clear()

**ClearLine** "Clears last line for writing" -> herb.clearLine()

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
herb.paragraph("Anim magna velit ipsum id et dolor labore."
+ "Irure ipsum enim in laborum deserunt elit sit eu sit id"
+ "et adipisicing eu do. Ad nulla ullamco excepteur consequat"
+ "veniam ut. Tempor elit excepteur nulla pariatur irure nisi.",
{ alignment: "center", color: "green", width: '50%', margin: '50%' });
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

**Line** "Output a divider" -> herb.line('_')
```javascript
herb.line('_');
// Or combine multiple characters
herb.line('<-->');
/// Outputs two full width (console width) lines e.g.:
// _________________________
// <--><--><--><--><--><--><-
```
---------------
[You can check out pictures of these methods here.](./tutorials/methods.md)


## Config & LogFile
```javascript
var herb = require('herb');

// Config is dynamic
// You can modify config at any point
herb.config({
  // Verbosity of logs (integer)
  // Note that higher numbers cover the entire group e.g. 3 = ['Log','Warn','Error']
  verbose: 3, // 4: Info, 3: Log, 2: Warn, 1: Error, 0: Fatal

  prependTime: false, // Prepends time [hour:minute:seconds] to every log if enabled

  // Can be set to a file e.g. "./log" & logs every log within the verbosity into the file
  logFile: undefined
})
```
Log files can be read using a simple code:
```javascript
var fs = require('fs');
console.log(fs.readFileSync('./log', {encoding: 'utf8'}));
```

## Marker
You can modify **background**, **color** and **style** of every output using marker. If { permanent: boolean } is set to true then the marker will override every output otherwise it will be cleared after each output.
```javascript
var herb = require('herb');

herb.marker({ color: 'green' }).log('A success story!');
// A Magenta line
herb.marker({ color: 'magenta' }).line('-');
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
