var chai = require("chai");
var herb = require("./herb");

var _ = require("lodash");
var chalk = require("chalk");

var should = chai.should();
var expect = chai.expect;

herb.config({ verbose: 4, testSuite: true });
describe('Test Suite', function(){
	describe('Log parsing checks', function(){
		it('should return log if verbosity >= 0', function(done){
			herb.parse(function(){
				var args = _.toArray(arguments);
				
				args[0].should.equal("\u001b[34mTest1\u001b[39m");
				args[1].should.equal("\u001b[34mTest2\u001b[39m");
				
				done();
			}, "Test1", "Test2");
		})

		it('should accept JSON', function(done){
			herb.parse(function(){
                                var args = _.toArray(arguments);
				
				var sampleFunction = function x(){};

                                args[0].should.equal("\u001b[34m{\n      \"test\": \"test\",\n      \"inner\": {\n          \"one\": true\n      },\n      \"array\": [\n          2,\n          3,\n          4\n      ]\n  }\u001b[39m");
                                args[1].should.equal("\u001b[34m[\n      1,\n      2,\n      3\n  ]\u001b[39m");
				args[2].should.equal(sampleFunction.toString());
				
				done();
                        }, {test:'test', inner:{one:true}, array:[2,3,4]}, [1,2,3], function x(){});
		})

		it('should accept multi-arguments', function(done){
			herb.parse(function(){
                                var args = _.toArray(arguments);

                                args[0].should.equal("\u001b[34mtest\u001b[39m");
                                args[1].should.equal(2.53);
				args[2].should.equal("\u001b[34m[\n      53,\n      5,\n      5\n  ]\u001b[39m");
				args[3].should.equal("\u001b[34mone\u001b[39m");
				args[4].should.equal("\u001b[34m{\n      \"one\": true\n  }\u001b[39m");

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

                                args[0].should.equal("\u001b[1m| \u001b[22m"); 
				args[1].should.equal("\u001b[34mGroup Item\u001b[39m");
                                done();
                        }, "Group Item");
                })
		it('should display nested groups correctly', function(done){
                        herb.group("New Group 2");
                        herb.parse(function(){
                                var args = _.toArray(arguments);

                                args[0].should.equal("\u001b[1m| | \u001b[22m");
                                args[1].should.equal("\u001b[34mGroup Item\u001b[39m");
                                done();
                        }, "Group Item");
                })
	})

});
