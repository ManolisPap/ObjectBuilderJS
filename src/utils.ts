function isObject(obj: any) {
  return obj && typeof obj === "object" && obj.constructor === Object;
}

function isString(str: any) {
  return typeof str === "string";
}

type Primitive = string | number | boolean | null;

function isJsonPrimitive(value: Primitive) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null
  );
}

export { isObject, isString, isJsonPrimitive, type Primitive };
