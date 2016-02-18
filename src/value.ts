import {Properties} from "./properties";

export function Value(expression){

    return function(targetClass, attributeName){

        if(delete targetClass[attributeName]){

            Object.defineProperty(targetClass, attributeName, {

                get: function(){
                    return Properties.initialize().get(expression);
                },

                enumerable: true,
                configurable: true
            });

        }

    };
}