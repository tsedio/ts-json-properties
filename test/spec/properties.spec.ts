
import {Properties} from "../../src/properties";
import {Value} from "../../src/value";
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

    it('should return immutable value', function(){
        var properties = Properties.initialize(root + '/example/properties.json');

        var immutableValue = properties.get('documents');

        expect(immutableValue).to.be.a('object');
        expect(immutableValue.myDocument).to.equal('http://localhost.fr/mypdf.pdf');

        //Change value :
        immutableValue.myDocument = 'http://localhost.fr/mypdf3.pdf';

        expect(properties.get('documents.myDocument')).to.not.equal(immutableValue.myDocument, 'Value is mutable');
        expect(properties.get('documents').myDocument).to.not.equal(immutableValue.myDocument, 'Value is mutable');

        expect(properties.get('documents.myDocument')).to.equal('http://localhost.fr/mypdf.pdf');
    });

    describe('Properties.getValue', function(){

        it('should return property when expression => "product" ', function(){
            Properties.initialize(root + '/example/properties.json');

            expect(Properties.getValue('product')).to.be.a('string');
            expect(Properties.getValue('product')).to.equal('MP');
        });

    });
});
