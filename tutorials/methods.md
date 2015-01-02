
## Methods

**Info, Log, Warn, Error** (color:blue, blue, yellow, red, verbosity:4, 3, 2, 1) -> herb.log(log, json, ...)
```javascript
herb.info("Some nice information that won't be displayed if verbosity is below 4");
herb.config({ verbose: 4 }).info("Some nice information that would display when verbosity is 4 or above");

herb.warn("Some warning that displays").config({ verbose: 1 }).error("Switch to errors only mode");
herb.warn("You won't see this");
```

---------------
**Clear** "Clears console screen" -> herb.clear()

---------------

**ClearLine** "Clears last line for writing" -> herb.clearLine()
---------------

**Count** "Counts to label" -> herb.count(label)
```javascript
for(i=0; i<10; i++) {
	herb.count("Apples");
}
```

---------------
**Group, GroupEnd** "Creates a group" -> herb.group(title)
```javascript
herb.group("Fruits");
herb.log("Apples");
herb.log("Oranges");
herb.groupEnd();
herb.warn("Group ended!");
```
---------------
**Time, TimeEnd** "Measure time in ms" -> herb.time(label)
```javascript
herb.time("timeout");
setTimeout(function() { herb.timeEnd("timeout") }, 1200);
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
```

---------------

**Line** "Output a divider" -> herb.line('_')
```javascript
herb.line('_');
// Or combine multiple characters
herb.marker({ color: 'magenta' }).line('<-->');
```
---------------
