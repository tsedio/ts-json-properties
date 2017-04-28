import {Properties} from "./properties";

export function Constant(expression) {

    return (targetClass: any, attributeName: string) => {

        if (delete targetClass[attributeName]) {

            let constant;

            Object.defineProperty(targetClass, attributeName, {

                get: function() {
                    constant = Object.freeze(constant !== undefined ? constant : Properties.initialize().get(expression));
                    return constant;
                },

                enumerable: true,
                configurable: true
            });
        }

    };
}