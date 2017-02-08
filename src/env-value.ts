import {Properties} from "./properties";

export function EnvValue(expression, defaultValue?){

    return (targetClass: any, attributeName: string) => {

        if(delete targetClass[attributeName]){

            let value;
            const defaultKey = expression + 'Default';

            Object.defineProperty(targetClass, attributeName, {

                get: function(){
                    return process.env[value ? value : Properties.initialize().get(expression)] || Properties.initialize().get(defaultKey) || defaultValue;
                },

                set: function(v){
                    value = v;
                },

                enumerable: true,
                configurable: true
            });
        }

    };
}