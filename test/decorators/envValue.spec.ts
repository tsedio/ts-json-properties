import {EnvValue} from "../../src/decorators/envValue";
import {Properties} from "../../src/utils/Properties";
import Chai = require("chai");

const expect = Chai.expect;

const path = require("path");
const root = path.resolve(__dirname + "./../../");

class TestValue {
}

describe("@EnvValue", () => {
    const classInstance: any = new TestValue();

    before(() => {
        Properties.initialize(path.join(root, "/example/properties.json"));

        process.env.product = "testEnv";

        EnvValue("product")(classInstance, "myAttribute");
        EnvValue("config")(classInstance, "myAttribute2");
        EnvValue("unknow", "default")(classInstance, "myAttribute3");
        EnvValue("unknow", "default")(classInstance, "myAttribute4");

        classInstance.myAttribute4 = "otherValue";
    });

    it("should get value from process.env", () => {
        expect(classInstance.myAttribute).to.equal("testEnv");
    });

    it("should get value from properties", () => {
        expect(classInstance.myAttribute2).to.deep.equal({env: "test"});
    });

    it("should get value from default value", () => {
        expect(classInstance.myAttribute3).to.deep.equal("default");
    });
});
