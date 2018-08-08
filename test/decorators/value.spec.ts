import {Value} from "../../src/decorators/value";
import {Properties} from "../../src/utils/Properties";
import Chai = require("chai");

const expect = Chai.expect;

const path = require("path");
const root = path.resolve(__dirname + "./../../");

class TestValue {}

describe("@Value", () => {
  const classInstance: any = new TestValue();

  before(() => {
    Properties.initialize(root + "/example/properties.json");
    Value("product")(classInstance, "myAttribute");
    Value("config")(classInstance, "config");
  });

  it("should initialize, load properties.json and values attribute", () => {
    expect(classInstance.myAttribute).to.equal("MP");
    expect(classInstance.config).to.be.an("object");
  });

  it("should set value to the decorated attribut", () => {
    expect(classInstance.myAttribute).to.equal("MP");

    classInstance.myAttribute = "newValue";

    expect(classInstance.config).to.be.an("object");

    classInstance.config.env = "prod";

    expect(classInstance.config.env).to.equal("prod");
  });
});
