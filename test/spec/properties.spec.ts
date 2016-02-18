
import {Properties} from "../../src/properties";
import Chai = require('chai');

var expect = Chai.expect;

var path = require('path');
var root = path.resolve(__dirname + './../../');

describe('Properties', function(){

    it('should initialize and load properties.json', function(){

        var properties = Properties.initialize(root + '/example/properties.json');

        expect(properties).to.be.an.instanceof(Properties);

    });

    it('should return property when expression => "product" ', function(){
        var properties = Properties.initialize(root + '/example/properties.json');

        expect(properties.get('product')).to.be.a('string');
        expect(properties.get('product')).to.equal('MP');
    });

    it('should return property when expression => "documents.myDocument" ', function(){
        var properties = Properties.initialize(root + '/example/properties.json');

        expect(properties.get('documents.myDocument')).to.be.a('string');
        expect(properties.get('documents.myDocument')).to.equal('http://localhost.fr/mypdf.pdf');
    });


});