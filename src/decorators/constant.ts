import {Properties} from "../utils/Properties";

export function Constant(expression: string) {
  return (target: any, propertyKey: string) => {
    if (delete target[propertyKey]) {
      let constant: any;

      Object.defineProperty(target, propertyKey, {
        get: function() {
          constant = Object.freeze(constant !== undefined ? constant : Properties.get(expression));
          return constant;
        },

        enumerable: true,
        configurable: true
      });
    }
  };
}
