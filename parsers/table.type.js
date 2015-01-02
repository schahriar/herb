// Modules
var _ = require("lodash");
var culinary = require("culinary");
var cook = culinary.style;
var Table = require('cli-table');
// Source
var utils = require("../lib/utils");

module.exports = function(arguments) {
	var table = {
		headers: [],
		rows: [],
		chars: {
          'top': '-'
        , 'top-mid': ' '
        , 'top-left': ' '
        , 'top-right': ' '
        , 'bottom': '-'
        , 'bottom-mid': ' '
        , 'bottom-left': ' '
        , 'bottom-right': ' '
        , 'left': ' '
        , 'left-mid': ' '
        , 'mid': '-'
        , 'mid-mid': ' '
        , 'right': ' '
        , 'right-mid': ' '
        , 'middle': ' '
      }
	}

	// Unify arguments
	arguments = _.toArray(arguments);
	
	// Detect type
	if(_.isArray(arguments[0])) {
		// Arguments passed like .table(headers,rows)
		table.headers = arguments[0];
		table.rows = arguments[1];
		table.widths = arguments[2];
		table.align = arguments[3];
	}else{
		// Arguments passed like .table({ headers: [...], rows:[[...],[...],...] })
		if(!arguments[0].header) arguments[0].header = arguments[0].head;
		if(!arguments[0].widths) arguments[0].widths = arguments[0].colWidths;
		table.headers = arguments[0].headers;
		table.rows = arguments[0].rows;
		table.widths = arguments[0].widths;
		table.align = arguments[0].align;
		if(arguments[0].borders) table.chars = {
			  'top': '─'
			, 'top-mid': '┬'
			, 'top-left': '┌'
			, 'top-right': '┐'
			, 'bottom': '─'
			, 'bottom-mid': '┴'
			, 'bottom-left': '└'
			, 'bottom-right': '┘'
			, 'left': '│'
			, 'left-mid': '├'
			, 'mid': '─'
			, 'mid-mid': '┼'
			, 'right': '│'
			, 'right-mid': '┤'
			, 'middle': '│'
		  };
	}
	
	var optimal = (100/table.headers.join('').length);
	
	var widths = [];

	// Assign a width to each header
	_.forEach(table.headers, function(header, index, scope) {
		if(!_.isNumber(widths[index]))
			widths[index] = Math.round(Math.min(100, Math.round((((utils.width()/100) * (header.length * optimal)) - 2)*100)/100));
	})
	
	var render = new Table({
		head: table.headers,
	    colWidths: widths,
		style: {
			head: ['green']
		},
		chars: table.chars
	});
	
	_.forEach(table.rows, function(row, index, scope) {
		render.push(row);
	});

	return ['\n\n' + render.toString()];
}