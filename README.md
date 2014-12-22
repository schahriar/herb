herb
====

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

## License
MIT © Schahriar SaffarShargh <info@schahriar.com>
