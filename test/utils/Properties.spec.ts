import {Properties} from "../../src/utils/Properties";
import Chai = require("chai");

const expect = Chai.expect;

const path = require("path");
const root = path.resolve(__dirname + "./../../");

describe("Properties", () => {
  describe("Properties.Initialize()", () => {
    beforeEach(() => {
      Properties.clean();
    });
    it("should find properties.json on project root (with parameters)", () => {
      const properties = Properties.initialize("/example/properties.json", true);

      expect(properties).to.be.an.instanceof(Properties);
    });

    it("should load properties.json file from an absolute path", () => {
      const properties = Properties.initialize(root + "/example/properties.json");

      expect(properties).to.be.an.instanceof(Properties);
    });

    it("should try to autoload properties_.json but it’ll will fail", () => {
      const properties = Properties.initialize("properties_.json", true);

      expect(properties).to.equal(undefined);
    });

    it("shouldn't find properties.json on project root (implicitly path)", () => {
      const properties = Properties.initialize();

      expect(properties).to.equal(undefined);
    });

    it("should throw Error when file doesn't exists", () => {
      try {
        Properties.initialize(root + "/example/error_properties.json");
      } catch (er) {
        expect(er).to.be.an.instanceof(Error);
      }
    });
  });

  describe("Access to properties data", () => {
    it("should return property when expression => product ", () => {
      Properties.initialize(root + "/example/properties.json");

      expect(Properties.get("product")).to.be.a("string");
      expect(Properties.get("product")).to.equal("MP");
    });

    it("should return property when expression => product ", () => {
      const properties = new Properties(root + "/example/properties_no_cwd.json");

      expect(properties.get("product")).to.be.a("string");
      expect(properties.get("product")).to.equal("MP");
    });

    it("should return property when expression => product ", () => {
      try {
        const properties = new Properties(root + "/example/properties_without_dot.json");
      } catch (er) {
        expect(er).to.be.an.instanceof(Error);
      }
    });

    it("should return property when expression => 'documents.myDocument' ", () => {
      Properties.initialize(root + "/example/properties.json");

      expect(Properties.getValue("documents.myDocument")).to.be.a("string");
      expect(Properties.getValue("documents.myDocument")).to.equal("http://localhost.fr/mypdf.pdf");
    });

    it("should return immutable value", () => {
      Properties.initialize(root + "/example/properties.json");

      const immutableValue = Properties.get("documents");

      expect(immutableValue).to.be.a("object");
      expect(immutableValue.myDocument).to.equal("http://localhost.fr/mypdf.pdf");

      // Change value :
      immutableValue.myDocument = "http://localhost.fr/mypdf3.pdf";

      expect(Properties.get("documents.myDocument")).to.not.equal(immutableValue.myDocument, "Value is mutable");
      expect(Properties.get("documents").myDocument).to.not.equal(immutableValue.myDocument, "Value is mutable");

      expect(Properties.get("documents.myDocument")).to.equal("http://localhost.fr/mypdf.pdf");
    });
  });

  describe("Properties.get()", () => {
    it("should return property when expression => product ", () => {
      Properties.initialize(root + "/example/properties.json");

      expect(Properties.get("product")).to.be.a("string");
      expect(Properties.get("product")).to.equal("MP");
    });
  });
});
