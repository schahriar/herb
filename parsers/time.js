var _ = require("lodash");

module.exports = {
	render: function(cook, time){
		var now = new Date();
		
		// If time is defined assign it to now
		if(_.isDate(time)) now = time;
		
		var hour = now.getHours();
		var minute = (now.getMinutes() < 10)?("0" + now.getMinutes()): now.getMinutes();
		var second = (now.getSeconds() < 10)?("0" + now.getSeconds()): now.getSeconds();
		
		return cook("[" + hour + ":" + minute + ":" + second + "] ").spice("dim");
	}
}