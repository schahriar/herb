**Log** (color:blue, verbosity:3) -> herb.log(log)

**Info** (color:blue, verbosity:4) -> herb.info(log)

**Warn** (color:yellow, verbosity:2) -> herb.warn(log)

**Error** (color:red, verbosity:1) -> herb.error(log)

**Clear** "Clears console" -> herb.clear()

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