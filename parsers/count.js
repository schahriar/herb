module.exports = function(cook, config, buffers, label, options, callback){
	if(config.verbose < options.verbose) return null;
		
	// Specs: https://developer.mozilla.org/en-US/docs/Web/API/Console.count
	if(!label) label = "";
	if(!buffers.count[label]) buffers.count[label] = 1;
	  else buffers.count[label]++;

	callback([
		group.render(options.title, buffers.group.length),
		cook(label + ' : ' + buffers.count[label]).spice(options.color)
	]);
}