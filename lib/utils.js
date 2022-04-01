"use strict";
function isObject(obj) {
    return obj && typeof obj === "object" && obj.constructor === Object;
}
function isString(str) {
    return typeof str === "string";
}
function isJsonPrimitive(value) {
    return (typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        value === null);
}
module.exports = {
    isObject: isObject,
    isString: isString,
    isJsonPrimitive: isJsonPrimitive,
};
// export { isObject, isString, isJsonPrimitive };
