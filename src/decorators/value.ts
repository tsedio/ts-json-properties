import {Properties} from "../utils/Properties";

export function Value(expression: any) {
  return (target: any, propertyKey: string) => {
    if (delete target[propertyKey]) {
      let value: any;

      Object.defineProperty(target, propertyKey, {
        get: function() {
          value = value !== undefined ? value : Properties.get(expression);
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
