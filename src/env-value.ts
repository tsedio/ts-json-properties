import {Properties} from "./properties";

export function EnvValue(expression, defaultValue?) {

    return (targetClass: any, attributeName: string) => {

        if (delete targetClass[attributeName]) {

            let value;
            const defaultKey = expression + "Default";

            Object.defineProperty(targetClass, attributeName, {

                get: function() {
                    value = process.env[value ? value : Properties.initialize().get(expression)] || Properties.initialize().get(defaultKey) || defaultValue;

                    return value;
                },

                set: function(v) {
                    value = v;
                },

                enumerable: true,
                configurable: true
            });
        }

    };
}