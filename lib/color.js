var chalk = require('chalk');

module.exports = function(color, argument, enforced) {
	if((chalk.hasColor(argument))&&(!enforced)) return argument;
	else return chalk[color](argument);
}