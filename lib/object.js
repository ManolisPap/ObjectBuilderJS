"use strict";
var utils = require("./utils");
function parseJPath(jPath) {
    var stringSymbols = jPath.split(".");
    var symbols = stringSymbols.map(function (strSymbol) {
        if (strSymbol.includes("[")) {
            return {
                symbol: strSymbol.split("[")[0],
                isArray: true,
                index: parseInt(strSymbol.split("[")[1].split("]")[0]),
            };
        }
        else {
            return {
                symbol: strSymbol,
                isArray: false,
            };
        }
    });
    return symbols;
}
function parametersCheck(jPath, obj, value) {
    if (!utils.isString(jPath)) {
        throw new Error("'jPath' need to be a string!");
    }
    if (!utils.isObject(obj)) {
        throw new Error("'obj' need to be an object!");
    }
    if (!utils.isJsonPrimitive(value)) {
        throw new Error("'value' need to be a string or number or boolean or null!");
    }
}
function objectBuilder(jPath, obj, value) {
    parametersCheck(jPath, obj, value);
    var symbols = parseJPath(jPath);
    var len = symbols.length;
    var last = len - 1;
    if (len === 1) {
        var symbol = symbols[0].symbol;
        var isArray = symbols[0].isArray;
        if (isArray) {
            if (!obj[symbol]) {
                obj[symbol] = [value];
            }
            else {
                obj[symbol].push(value);
            }
        }
        else {
            obj[symbol] = value;
        }
        return obj;
    }
    var it = obj;
    for (var i = 0; i < len; i++) {
        var jPathExists = false;
        var newObj = void 0;
        if (symbols[i].isArray) {
            newObj = [];
            if (i === last) {
                newObj.push(value);
            }
        }
        else {
            newObj = {};
            if (i === last) {
                newObj = value;
            }
        }
        if (Array.isArray(it)) {
            // when the previous is Array
            var o = {};
            o[symbols[i].symbol] = newObj;
            it.push(o);
        }
        else {
            if (!it[symbols[i].symbol]) {
                // does not already exists
                it[symbols[i].symbol] = newObj; // create it, OLD
            }
            else {
                // exists
                jPathExists = true;
                it = it[symbols[i].symbol]; // get the obj existing value
                if (symbols[i].isArray && it.length > symbols[i].index) {
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
module.exports = objectBuilder;
