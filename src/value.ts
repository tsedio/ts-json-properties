import {Properties} from "./properties";

export function Value(expression){

    return function(targetClass, attributeName){

        if(delete targetClass[attributeName]){

            var value;

            Object.defineProperty(targetClass, attributeName, {

                get: function(){
                    return value ? value : Properties.initialize().get(expression);
                },

                set:function(v){
                    value = v;
                },

                enumerable: true,
                configurable: true
            });
        }

    };
}