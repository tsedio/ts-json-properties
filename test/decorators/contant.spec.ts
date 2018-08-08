import {assert, expect} from "chai";
import {Constant} from "../../src/decorators/constant";
import {Properties} from "../../src/utils/Properties";

const path = require("path");
const root = path.resolve(__dirname + "./../../");

class TestConstant {}

describe("@Constant", () => {
  const classInstance: any = new TestConstant();

  before(() => {
    Properties.initialize(root + "/example/properties.json");

    Constant("product")(classInstance, "myAttribute");
    Constant("config")(classInstance, "config");
  });

  it("should initialize, load properties.json and Constants attribute", () => {
    expect(classInstance.myAttribute).to.equal("MP");
    expect(classInstance.config).to.be.an("object");
  });

  it("should not set a value to the decorated attribut", () => {
    assert.throws(() => (classInstance.myAttribute = "newConstant"), TypeError, /Cannot set property myAttribute of/);
    assert.throws(() => (classInstance.config.env = "newConstant"), TypeError, /Cannot assign to read only property/);
  });
});
