
import {Properties} from "../../src/properties";
import {Value} from "../../src/value";
import Chai = require('chai');

var expect = Chai.expect;

var path = require('path');
var root = path.resolve(__dirname + './../../');

class TestValue{
    @Value('MP')
    public myAttribut = '';
}

describe('@Value decorator', function(){

    beforeEach(function(){
        Properties.initialize(root + '/example/properties.json');
    });

    it('should initialize, load properties.json and values attribute', function(){

        var decorator = Value('product');
        var classInstance:any = new TestValue();

        decorator(classInstance, 'myAttribute');

        expect(classInstance.myAttribute).to.equal('MP');

    });


});


