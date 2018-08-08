import Fs = require("fs");
import path = require("path");
import {parse} from "./parse";

let instance: Properties | undefined;

export class Properties {
  private _properties: any;

  /**
   *
   * @param file
   */
  constructor(file: string) {
    this._properties = {};
    this.read(this._properties, file);
  }

  /**
   *
   * @param {string} expression
   * @returns {any}
   */
  static get(expression: string) {
    return instance!.get(expression);
  }

  /**
   *
   * @param {string} expression
   * @returns {any}
   */
  static getValue(expression: string) {
    return instance!.get(expression);
  }

  /**
   * Load file properties from file location or autoload file (set just filename)
   * @param file
   * @param autoload
   * @returns {Properties}
   */
  static initialize(file?: string, autoload?: boolean) {
    if (!instance) {
      if (file && !autoload) {
        instance = new Properties(file);
      } else {
        let propFile = this.findPropertiesFile(file);

        if (propFile) {
          instance = new Properties(<string>propFile);
        }
      }
    }
    return instance;
  }

  /**
   *
   */
  static clean() {
    instance = undefined;
  }

  /**
   * Find properties.json in the folder, parent folder, etc...
   * @returns {any}
   */
  static findPropertiesFile(file: string = "properties.json"): boolean | string {
    let folder: string = process.cwd();
    let current: any;

    while (!Fs.existsSync(path.join(folder, file)) && current !== folder) {
      current = folder;
      folder = path.resolve(path.join(folder, "/.."));
    }

    if (current === folder) {
      return false;
    }

    return path.join(folder, file);
  }

  /**
   *
   * @param expression
   * @returns {any}
   */
  public get(expression: string) {
    return parse(expression, this._properties);
  }

  /**
   *
   * @param node
   * @param file
   */
  private read(node: any, file: string) {
    file = path.resolve(file);

    if (!Fs.existsSync(file)) {
      throw new Error("Cannot find file properties '" + file + "'");
    }
    let properties = require(file);

    for (let key in properties) {
      if (key === "propertiesFiles") {
        let propertiesFiles = properties[key];

        try {
          let cwd = path.dirname(file);

          if (propertiesFiles.cwd) {
            if (propertiesFiles.cwd.match(/^\./)) {
              cwd = path.dirname(file) + "/" + propertiesFiles.cwd;
            } else {
              cwd = propertiesFiles.cwd;
            }
          }

          this.mount(node, cwd, propertiesFiles.files);
        } catch (er) {
          let message = `${er.message}.\nCheck "propertiesFiles" value in your configuration (${path.resolve(file)}).`;

          throw new Error(message);
        }
      } else {
        node[key] = properties[key];
      }
    }
  }

  /**
   *
   * @param node
   * @param cwd
   * @param propertiesFilesList
   */
  private mount(node: any, cwd: string, propertiesFilesList: any) {
    cwd = path.resolve(cwd);

    for (let mountName in propertiesFilesList) {
      let file = propertiesFilesList[mountName];
      let keys: string[] = mountName.split("."); // eval expression
      let subNode = node;

      for (let key in keys) {
        subNode[keys[key]] = {};
        subNode = subNode[keys[key]];
      }

      this.read(subNode, cwd + "/" + file);
    }
  }
}
