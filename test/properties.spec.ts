
import {Properties} from "../src/properties";
import {Value} from "../src/value";
import Chai = require('chai');

var expect = Chai.expect;

var path = require('path');
var root = path.resolve(__dirname + './../');

describe('Properties', function(){

    describe('Properties.Initialize()', function() {


        it('should find properties.json on project root (with parameters)', function(){

            Properties.clean();

            var properties = Properties.initialize('../example/properties.json', true);

            expect(properties).to.be.an.instanceof(Properties);

        });


        it('should load properties.json file from an absolute path', function(){

            Properties.clean();

            var properties = Properties.initialize(root + '/example/properties.json');

            expect(properties).to.be.an.instanceof(Properties);

        });

        it('should try to autoload properties_.json but it’ll will fail', function(){

            Properties.clean();

            var properties = Properties.initialize('properties_.json', true);

            expect(properties).to.equal(undefined);

        });

        it('shouldn\'t find properties.json on project root (implicitly path)', function(){
             Properties.clean();

             var properties = Properties.initialize();

             expect(properties).to.equal(undefined);

         });

        it('should throw Error when file doesn\'t exists', function(){

            Properties.clean();

            try{
                Properties.initialize(root + '/example/error_properties.json');
            }catch(er){
                expect(er).to.be.an.instanceof(Error);
            }

        });

    });

    describe('Access to properties data', function(){
        it('should return property when expression => "product" ', function(){
            var properties = Properties.initialize(root + '/example/properties.json');

            expect(properties.get('product')).to.be.a('string');
            expect(properties.get('product')).to.equal('MP');
        });

        it('should return property when expression => "product" ', function(){
            var properties = new Properties(root + '/example/properties_no_cwd.json');

            expect(properties.get('product')).to.be.a('string');
            expect(properties.get('product')).to.equal('MP');
        });

        it('should return property when expression => "product" ', function(){
            try{
                var properties = new Properties(root + '/example/properties_without_dot.json');
            }catch(er){
                expect(er).to.be.an.instanceof(Error);
            }
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
    });



    describe('Properties.getValue', function(){

        it('should return property when expression => "product" ', function(){
            Properties.initialize(root + '/example/properties.json');

            expect(Properties.getValue('product')).to.be.a('string');
            expect(Properties.getValue('product')).to.equal('MP');
        });

    });
});
