import path = require("path");
import Fs = require('fs');
import {parse} from "./parse";

export class Properties {

    private static _instance:Properties;
    private _properties:any;

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
     * @param node
     * @param file
     */
    private read(node: any, file: string) {

        file = path.resolve(file);

        if(!Fs.existsSync(file)){
            throw new Error("Cannot find file properties '"+ file +"'");
        }

        let properties = require(file);

        for(let key in properties){

            if(key === "propertiesFiles"){
                let propertiesFiles = properties[key];

                try{
                    let cwd = path.dirname(file);

                    if(propertiesFiles.cwd){
                        if(propertiesFiles.cwd.match(/^\./)) {
                            cwd = path.dirname(file) + '/' + propertiesFiles.cwd;
                        }else{
                            cwd = propertiesFiles.cwd;
                        }
                    }

                    this.mount(node, cwd, propertiesFiles.files);

                }catch(er){

                    let message = er.message + '. \nCheck "propertiesFiles" value in your configuration (' + path.resolve(file) + ').';

                    throw new Error(message);

                }

            }else{
                node[key] = properties[key];
            }
        }

    }

    /**
     * Set a new key. If key exists then ignored.
     * @param key
     * @param value
     */
    public set(key: string, value: any) {
        if (this._properties[key] === undefined) {
            this._properties[key] = value;
        }

        return this;
    }

    /**
     *
     * @param node
     * @param cwd
     * @param propertiesFilesList
     */
    private mount(node: any, cwd: string, propertiesFilesList: any) {
        cwd = path.resolve(cwd);

        for(let mountName in propertiesFilesList){

            let file = propertiesFilesList[mountName];
            let keys:string[] = mountName.split('.'); //eval expression
            let subNode = node;

            for(let key in keys){
                subNode[keys[key]] = {};
                subNode = subNode[keys[key]];
            }

            this.read(subNode, cwd + '/' + file);
        }
    }

    /**
     *
     * @param expression
     * @returns {any}
     */
    public get(expression) {
        return parse(expression, this._properties);
    }

    public static getValue(expression) {
        return Properties.initialize().get(expression);
    }

    /**
     * Load file properties from file location or autoload file (set just filename)
     * @param file
     * @param autoload
     * @returns {Properties}
     */
    static initialize(file?: string, autoload?: boolean) {

        if(!Properties._instance){
            if(file && !autoload){
                Properties._instance = new Properties(file);
            }else{
                let propFile = this.findPropertiesFile(file);

                if(propFile){
                    Properties._instance = new Properties(<string>propFile);
                }
            }
        }

        return Properties._instance;
    }

    static clean(){
        Properties._instance = undefined;
    }

    /**
     * Find properties.json in the folder, parent folder, etc...
     * @returns {any}
     */
    static findPropertiesFile(file: string = 'properties.json'): boolean | string {
        let folder:string = path.resolve(__dirname);
        let current;

        while(!Fs.existsSync(folder + '/' + file) && current != folder){
            current = folder;
            folder = path.resolve(folder + '/..');
        }

        if(current == folder){
            return false;
        }

        return folder +  '/' + file;
    }
}