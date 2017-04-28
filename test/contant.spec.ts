
import {Properties} from "../src/properties";
import {Constant} from "../src/constant";
import {expect, assert} from "chai";

const path = require("path");
const root = path.resolve(__dirname + "./../");

class TestConstant {
    public myAttribut;
    public config: any;
}

describe("@Constant decorator", function(){

    beforeEach(function(){
        Properties.initialize(root + "/example/properties.json");
    });

    it("should initialize, load properties.json and Constants attribute", () => {

        const classInstance: any = new TestConstant();

        Constant("product")(classInstance, "myAttribute");
        Constant("config")(classInstance, "config");

        expect(classInstance.myAttribute).to.equal("MP");
        expect(classInstance.config).to.be.an("object");

    });

    it("should not set a value to the decorated attribut", () => {

        const classInstance: any = new TestConstant();

        Constant("product")(classInstance, "myAttribute");
        Constant("config")(classInstance, "config");

        assert.throws(() => classInstance.myAttribute = "newConstant", TypeError, "Cannot set property myAttribute of #<TestConstant> which has only a getter");
        assert.throws(() => classInstance.config.env = "newConstant", TypeError, "Cannot assign to read only property \'env\' of object \'#<Object>\'");

    });

});


