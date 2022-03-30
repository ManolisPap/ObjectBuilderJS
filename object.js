function parseJPath(jpath) {
  const stringSymbols = jpath.split(".");

  const symbols = stringSymbols.map((strSymbol) => {
    if (strSymbol.includes("[")) {
      return {
        symbol: strSymbol.split("[")[0],
        isArray: true,
        index: parseInt(strSymbol.split("[")[1].split("]")[0]),
      };
    } else {
      return {
        symbol: strSymbol,
        isArray: false,
      };
    }
  });

  return symbols;
}

function objectBuilder(jPath, obj, value) {
  const symbols = parseJPath(jPath);
  const len = symbols.length;

  // case: name = "Jack"
  if (len === 1) {
    obj[symbols[0].symbol] = value;
    return obj;
  }

  let it = obj;
  for (let i = 0; i < len; i++) {
    let jPathExists = false;
    // jPath does not exists to the object, create it
    let newObj;
    if (symbols[i].isArray) {
      newObj = [];
    } else {
      newObj = {};
      // is the last element
      if (len - 1 === i) {
        newObj = value;
      }
    }

    if (Array.isArray(it)) {
      const o = {};
      o[symbols[i].symbol] = newObj;
      it.push(o);
    } else {
      if (!it[symbols[i].symbol]) {
        // does not already exists
        it[symbols[i].symbol] = newObj; // create it, OLD
      } else {
        // exists
        it = it[symbols[i].symbol]; // get the obj existing value

        // if it is array and the element already exists, set it to that element.
        if (symbols[i].isArray && it.length > symbols[i].index) {
          it = it.at(symbols[i].index);
        }

        jPathExists = true; // set the flag
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
