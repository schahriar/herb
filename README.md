![Herbal Logo](logo.png)

Add some true flavour to your **NodeJS** console
======

> **herb** is one day old! I had a 24 hour run since I came across how little the Node console or even substitutes offer and how much of Node's functionality with CLI is currently undocumented thus I decided to create **herb** to fill the gap that comes with Node and take it a step further. **Note that herb is currently in early stages of alpha and soon will include great additions that not only will correct the Node console but also add a rich layer of user-experience to your CLI!** With that being said **herb** will stay true to its nature as an additional layer and most of the methods you'll use today will consistently make it to the next.

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
  verbose: 3, // 4: Info, 3: Log, 2: Warn, 1: Error, 0: Fatal

  prependTime: false // Prepends time [hour:minute:seconds] to every log if enabled
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

## Contributing
The goal is to create a *rich command-line interface experience* for NodeJS.
I am currently looking for active contributors to create **documentation**, **improve** the code and add **innovations** to the module. If you are interested you can contact me directly at <info@schahriar.com>!

## License
MIT © Schahriar SaffarShargh <info@schahriar.com>
