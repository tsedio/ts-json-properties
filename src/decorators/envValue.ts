import {Properties} from "../utils/Properties";

export function EnvValue(expression: string, defaultValue?: any) {
  return (target: any, propertyKey: string) => {
    if (delete target[propertyKey]) {
      let value = process.env[expression.replace(/\./gi, "__")];

      Object.defineProperty(target, propertyKey, {
        get: function() {
          value = value === undefined ? Properties.get(expression) || defaultValue : value;
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
