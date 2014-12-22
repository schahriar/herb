herb
======
Add some true flavour to your NodeJS console
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
**Log** (color:blue, verbosity:3) -> herb.log(log)

---------------
**Info** (color:blue, verbosity:4) -> herb.info(log)

---------------
**Warn** (color:yellow, verbosity:2) -> herb.warn(log)

---------------
**Error** (color:red, verbosity:1) -> herb.error(log)

---------------
**Clear** "Clears console" -> herb.clear()

---------------
**Count** "Counts to label" -> herb.count(label)
```javascript
herb.count("Apples");
herb.count("Apples");
// Output:
// Apples : 1
// Apples : 2
```

---------------
**Group** "Creates a group" -> herb.group(title)
```javascript
herb.group("Fruits");
herb.log("Apples");
herb.log("Oranges");
// Output:
// > Fruits
// | Apples
// | Oranges
```

---------------
**GroupEnd** "Ends single top-level group" -> herb.groupEnd()
```javascript
herb.group("Fruits");
herb.log("Apples");
herb.log("Oranges");

herb.groupEnd();
herb.log("Cucumbers");
// Output:
// > Fruits
// | Apples
// | Oranges
// Cucumbers
```

---------------
Note: Time, TimeEnd, Trace, Dir, Assert currently have default behaviour
```javascript
// Example
herb.time('label');
setTimeout(function(){ herb.timeEnd('label'); }, 1000);
// Output:
// label: 1000ms 
```

## License
MIT © Schahriar SaffarShargh <info@schahriar.com>
