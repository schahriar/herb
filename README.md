![Herbal Logo](logo.png)

Add some true flavour to your **NodeJS** console
======

**herb** is a magical layer for the most complex of all *verbosities*. To put it in simple words it enables advanced functions missing in the current Node logging system (console.log). **You can group, count, and soon add progressbars & tables** all in *color!* and the best part about it is the fact that you can just replace the global ***console*** with **herb** without further modifications.

## Installation
```javascript
npm install herb
```
or if you are developing a module
```javascript
npm install herb --save
```

## Usage
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
  verbose: 3 // 4: Info, 3: Log, 2: Warn, 1: Error, 0: Fatal
})
```

## Methods
**herb** covers all current console functions and a lot more.
[To prevent TLTR we have moved methods here.](./tutorials/methods.md)

## Test Suite
You can do a complex yet boring test by running the following in the source directory:
```javascript
npm install mocha -g
npm test
```
*I'll soon add a visual test.*

## License
MIT © Schahriar SaffarShargh <info@schahriar.com>
