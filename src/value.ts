import {Properties} from "./properties";

export function Value(expression){

    return function(targetClass, attributeName){

        if(delete targetClass[attributeName]){

            var isset;

            Object.defineProperty(targetClass, attributeName, {

                get: function(){
                    return isset ? this['_'+attributeName] : Properties.initialize().get(expression);
                },

                set:function(v){

                    this['_'+attributeName] = v;
                    isset = v;

                },

                enumerable: true,
                configurable: true
            });
        }

    };
}