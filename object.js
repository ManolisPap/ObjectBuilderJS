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
      const o = {};
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

        // if it is array and the element already exists, set it to that element.
        if (symbols[i].isArray && it.length > symbols[i].index) {
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
