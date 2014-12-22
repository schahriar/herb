var console = require("./herb");
var interval = {};
var count = 0;

console.log("test","test2",[2,3,4]);
console.config({verbose:4});
console.group('New Group');
console.log("No. of columns: " + console._columns());
console.group('One more level');
console.warn("A warning!");
console.log("Some test");
console.groupEnd();
console.warn('Group end 1');
console.groupEnd();
console.warn('Group end 2');
console.log("A log followed by formatted JSON");
console.log({test:true, list:[{one:true},{two:true}]});
console.error("An error!");
setTimeout(function(){
	console.clear();
	console.warn("Console cleared");
	console.info("Counting to 5");
	interval.one = setInterval(function(){
		++count;
		if(count >= 5) clearInterval(interval.one);
		console.count();
	},400);
	setTimeout(function(){
		var count = 0;
		console.clear();
        	console.warn("Console cleared");
        	console.group("Counting to 5 with labels under two groups");
		console.warn("Here we go!");
		console.group("Group Title");
        	interval.two = setInterval(function(){
     	            ++count;
    	            if(count >= 5) clearInterval(interval.two);
                    console.count('label');
        	},400);
	},3000);
},3000);
