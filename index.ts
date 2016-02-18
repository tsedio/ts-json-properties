import path = require("path");
import Fs = require('fs');
import * as $log from "log-debug";

export class Properties{

    private static _instance:Properties;
    private _properties:any;
    private _debug:boolean = true;

    /**
     *
     * @param file
     */
    constructor(file:string){
        this._properties = {};
        this.read(this._properties, file);

        if(this._debug){
            $log.debug('Properties() =>', this._properties);
        }
    }

    /**
     *
     * @param node
     * @param file
     */
    private read(node:any, file:string){

        file = path.resolve(file);

        if(!Fs.existsSync(file)){
            throw new Error("Cannot find file properties '"+ file +"'");
        }

        var properties = require(file);

        if(this._debug){
            $log.debug('Properties.read() =>', file);
        }

        for(var key in properties){

            if(key == "propertiesFiles"){
                var propertiesFiles = properties[key];

                try{
                    var cwd = path.dirname(file);

                    if(propertiesFiles.cwd){
                        if(propertiesFiles.cwd.match(/^\./)) {
                            cwd = path.dirname(file) + '/' + propertiesFiles.cwd;
                        }else{
                            cwd = propertiesFiles.cwd;
                        }
                    }

                    this.mount(node, cwd, propertiesFiles.files);

                }catch(er){

                    if(er.message.indexOf('Cannot find') > -1){
                        var message = er.message + '. \nCheck "propertiesFiles" value in your configuration (' + path.resolve(file) + ').';

                        throw new Error(message);

                    }else{
                        throw er;
                    }
                }

            }else{
                node[key] = properties[key];
            }
        }

    }

    /**
     *
     * @param node
     * @param propertiesFilesList
     */
    private mount(node:any, cwd:string, propertiesFilesList:any){
        cwd = path.resolve(cwd);

        if(this._debug){
            $log.debug('Properties.mount() =>', cwd);
        }

        for(var mountName in propertiesFilesList){

            var file = propertiesFilesList[mountName];
            var keys:string[] = mountName.split('.'); //eval expression
            var subNode = node;

            for(var key in keys){
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
    public get(expression){

        var keys:string[] = expression.split('.'); //eval expression
        var node:any = this._properties;

        for(var i = 0;i < keys.length; i++){

            if(node[keys[i]] != undefined && node[keys[i]] != null){
                node = node[keys[i]];
            }else{
                return node[keys[i]];
            }
        }

        return node;
    }

    /**
     *
     * @returns {Properties}
     */
    static initialize(file?:string){

        if(!Properties._instance){
            if(file){
                Properties._instance = new Properties(file);
            }else{
                file = this.findPropertiesFile();

                if(file){
                    Properties._instance = new Properties(file);
                }
            }
        }

        return Properties._instance;
    }

    /**
     * Find properties.json in the folder, parent folder, etc...
     * @returns {any}
     */
    static findPropertiesFile():string{
        var folder = path.resolve(__dirname);
        var current = '';

        while(!Fs.existsSync(folder + '/properties.json')){
            current = path.resolve(folder + '/..');

            if(current == folder){
                return null;
            }

            folder = current;
        }

        return folder +  '/' + 'properties.json';
    }

    public debug(b){
        this._debug = b;
    }
}