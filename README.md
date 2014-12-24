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

### Basic progressbar
You can add basic synchronous *progressbars* to your CLI now! A progressbar matches the width of the command-line screen and only takes an integer input. More advanced progressbars will arrive with version **2.0**
```javascript
var herb = require('herb');

// Creates a new progress bar with optional parameters
var installProgress = new herb.progress({ title: "Installation progress:", bg: "cyan", fg: "yellow" });

// "done" event is emitted when the progressbar reaches 100%
installProgress.on('done', function(){
  herb.log("We are at full capacity!");
});

// Set a time or do some async operations
setTimeout(function(){ installProgress.set(50); /* Sets progressbar to 50% after 2 seconds */ }, 2000);
setTimeout(function(){ installProgress.set(100); /* Sets progressbar to 100% after 4 seconds */ }, 4000);

```
**Current color options:** "black","white", "gray", "dim" ,"red","green","yellow","blue","magenta","cyan","reset"

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
