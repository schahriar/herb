// Modules
var _ = require('lodash');
// Source
var parse = require('../lib/arguments');

module.exports = {
		parse: function(){
			// Unify arguments
			arguments = _.toArray(arguments);
			var callback = arguments.shift();
			parse.apply(this, ['log', arguments, { verbosity: 0, color: 'blue', strict: true }, undefined, function(parsed){
				callback.apply(this, arguments);
			}]);
        },
		
		setConfig: function(userConfig){
			// Made verbose & verbosity attributes flexible
				if((_.isNumber(userConfig.verbosity))&&(!userConfig.verbose)) userConfig.verbose = userConfig.verbosity;

			_.defaults(userConfig, this.__super__.defaults);
			_.defaults(userConfig, this.__super__.config);
			this.__super__.config = userConfig;
        },
		
		markerAttributes: {
			background: undefined,
			color: undefined,
			style: undefined,
		
			verbosity: undefined
		},
		
		// Marker allows for modification of each log
		marker: function(attributes, isPermanent) {
			if(isPermanent) attributes.permanent = true;
			if(attributes === 'reset') this.markerAttributes = {
				background: undefined,
                        	color: undefined,
                        	style: undefined,

                        	verbosity: undefined
			}; else _.defaults(this.__super__.markerAttributes, attributes);
			return this;
		},

		config: {
			json: {
				indent: 4,
				offset: 2
			},
			verbose: 3, // 4: Info, 3: Log, 2: Warn, 1: Error
			prependTime: false,
			logFile: false, // Log to file
			testSuite: false
		},
		
		defaults: this.config,

		// Memory buffers
		buffers: {
			count: {},
			group: [],
			time: []
		}
	}