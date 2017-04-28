
import {Properties} from "../src/properties";
import {Value} from "../src/value";
import Chai = require("chai");

const expect = Chai.expect;

const path = require("path");
const root = path.resolve(__dirname + "./../");

class TestValue {
    public myAttribut = "";
    public config: any;
}

describe("@Value decorator", function(){

    beforeEach(function(){
        Properties.initialize(root + "/example/properties.json");
    });

    it("should initialize, load properties.json and values attribute", () => {

        const classInstance: any = new TestValue();

        Value("product")(classInstance, "myAttribute");
        Value("config")(classInstance, "config");

        expect(classInstance.myAttribute).to.equal("MP");
        expect(classInstance.config).to.be.an("object");

    });

    it("should set value to the decorated attribut", () => {


        const classInstance: any = new TestValue();

        Value("product")(classInstance, "myAttribute");
        Value("config")(classInstance, "config");

        expect(classInstance.myAttribute).to.equal("MP");

        classInstance.myAttribute = "newValue";

        expect(classInstance.config).to.be.an("object");

        classInstance.config.env = "prod";

        expect(classInstance.config.env).to.equal("prod");

    });

});


