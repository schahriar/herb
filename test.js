var chai = require("chai");
var herb = require("./herb");

var _ = require("lodash");

var should = chai.should();
var expect = chai.expect;

var look = {
	escape: "\u001b[",
	reset: "0m",
	resetBold: "22m",
	
	blue: function(string){
		return this.escape.concat("049;34m",string,this.escape,this.reset);
	},
	bold: function(string){
		return this.escape.concat("01;49;39m",string,this.escape,this.reset);
	}
}

herb.config({ verbose: 4, testSuite: true });
describe('Test Suite', function(){
	describe('Log parsing checks', function(){
		it('should return log if verbosity >= 0', function(done){
			herb.parse(function(){
				var args = _.toArray(arguments);
				
				args[0].should.equal(look.blue("Test1"));
				args[1].should.equal(look.blue("Test2"));
				
				done();
			}, "Test1", "Test2");
		})

		it('should accept JSON', function(done){
			herb.parse(function(){
				var args = _.toArray(arguments);

				var sampleFunction = function x(){};

				args[0].should.equal(look.blue("{\n      \"test\": \"test\",\n      \"inner\": {\n          \"one\": true\n      },\n      \"array\": [\n          2,\n          3,\n          4\n      ]\n  }"));
				
				args[1].should.equal(look.blue("[\n      1,\n      2,\n      3\n  ]"));
				args[2].should.equal(sampleFunction.toString());

				done();
			}, {test:'test', inner:{one:true}, array:[2,3,4]}, [1,2,3], function x(){});
		})

		it('should accept multi-arguments', function(done){
			herb.parse(function(){
				var args = _.toArray(arguments);

				args[0].should.equal(look.blue("test"));
				args[1].should.equal(2.53);
				args[2].should.equal(look.blue("[\n      53,\n      5,\n      5\n  ]"));
				args[3].should.equal(look.blue("one"));
				args[4].should.equal(look.blue("{\n      \"one\": true\n  }"));

				done();
			}, "test", 2.53, [53,5,5], "one", {one:true});
		})

		it('should not return log when verbosity < 0', function(done){
			herb.config({ verbose: -1 })
			herb.parse(function(){
				var args = _.toArray(arguments);

				expect(args[0]).to.equal(undefined);

				done();
			}, "Test1");
		})
		
		it('should display groups correctly', function(done){
			herb.config({ verbose: 0 });
			herb.group("New Group");
			herb.parse(function(){
				var args = _.toArray(arguments);

				args[0].should.equal(look.bold("| ")); 
				args[1].should.equal(look.blue("Group Item"));
				done();
			}, "Group Item");
		})
		
		it('should display nested groups correctly', function(done){
			herb.group("New Group 2");
			herb.parse(function(){
				var args = _.toArray(arguments);

				args[0].should.equal(look.bold("| | "));
				args[1].should.equal(look.blue("Group Item"));
				done();
			}, "Group Item");
		})
	})

});
