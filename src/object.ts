// const utils = require("./utils");
import { isObject, isString, isJsonPrimitive, Primitive } from "./utils";

type SymbolArray = {
  symbol: string;
  isArray: true;
  index: number;
};

type SymbolObject = {
  symbol: string;
  isArray: false;
  index?: never;
};

type JPathSymbol = SymbolArray | SymbolObject;

function parseJPath(jPath: string): Array<JPathSymbol> {
  const stringSymbols = jPath.split(".");

  const symbols = stringSymbols.map((strSymbol) => {
    if (strSymbol.includes("[")) {
      return {
        symbol: strSymbol.split("[")[0],
        isArray: true,
        index: parseInt(strSymbol.split("[")[1].split("]")[0]),
      } as SymbolArray;
    } else {
      return {
        symbol: strSymbol,
        isArray: false,
      } as SymbolObject;
    }
  });

  return symbols;
}

function parametersCheck(jPath: string, obj: any, value: Primitive) {
  if (!isString(jPath)) {
    throw new Error("'jPath' need to be a string!");
  }
  if (!isObject(obj)) {
    throw new Error("'obj' need to be an object!");
  }
  if (!isJsonPrimitive(value)) {
    throw new Error(
      "'value' need to be a string or number or boolean or null!"
    );
  }
}

function objectBuilder(jPath: string, obj: any, value: Primitive) {
  parametersCheck(jPath, obj, value);
  const symbols = parseJPath(jPath);
  const len = symbols.length;
  const last = len - 1;

  if (len === 1) {
    const symbol = symbols[0].symbol;
    const isArray = symbols[0].isArray;
    if (isArray) {
      if (!obj[symbol]) {
        obj[symbol] = [value];
      } else {
        obj[symbol].push(value);
      }
    } else {
      obj[symbol] = value;
    }
    return obj;
  }

  let it = obj;
  for (let i = 0; i < len; i++) {
    let jPathExists = false;
    let newObj;
    if (symbols[i].isArray) {
      newObj = [];
      if (i === last) {
        newObj.push(value);
      }
    } else {
      newObj = {};
      if (i === last) {
        newObj = value;
      }
    }

    if (Array.isArray(it)) {
      // when the previous is Array
      const o: any = {};
      o[symbols[i].symbol] = newObj;
      it.push(o);
    } else {
      if (!it[symbols[i].symbol]) {
        // does not already exists
        it[symbols[i].symbol] = newObj; // create it, OLD
      } else {
        // exists
        jPathExists = true;
        it = it[symbols[i].symbol]; // get the obj existing value

        if (symbols[i].isArray && it.length > <number>symbols[i].index) {
          // if it is array and the element already exists, set it to that element.
          it = it.at(symbols[i].index);
        }
        // if it is the last symbols and is array, will contain raw values (not objects)
        if (i === last && symbols[i].isArray) {
          it.push(value);
        }
      }
    }
    if (!jPathExists) {
      // only if paths does not exists set it, to newObj, else get the existing one
      it = newObj;
    }
  }

  // console.dir(obj, {depth: null})

  return obj;
}
export default objectBuilder;
