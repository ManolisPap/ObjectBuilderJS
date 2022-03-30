const user = {
  name: "Claus",
  lastName: "Claus",
  address: {
    zipCode: 70200,
    telephone: [
      {
        number: 123,
      },
      {
        number: 345,
      },
    ],
  },
};

// user.address.telephones[0].number
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

// parseJPath("user.address.telephones[0].number");

// user.address.telephones[0].number

const TMP = {
  "user.name": "Claus",
  "user.lastName": "Claus",
  "user.address.zipCode": 70200,
  "user.address.telephones[0].number": 123,
  // "user.address.telephones[1].number": 345,
};

// {
//   'users[0]': [ family: { name: 'Claus', members: 2 } ],
//   'users[1]': [ family: { name: 'Jack' } ]
// }
//   users: [ { family: { name: 'Claus' } }, { members: 2 }, { name: 'Jack' } ]
//                             {}
function objectBuilder(jPath, obj, value) {
  const symbols = parseJPath(jPath);
  const len = symbols.length;

  // case: name = "Jack"
  if (len === 1) {
    obj[symbols[0].symbol] = value;
    return obj;
  }

  let it = obj;
  let jPathExists = false;
  for (let i = 0; i < len; i++) {
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
    jPathExists = false; // reset flag for next time
  }

  // console.dir(obj, {depth: null})

  return obj;
}

// ============================================================

// function jPathExists(jPath, obj) {
//   const symbols = parseJPath(jPath);
//   const len = symbols.length;

//   let it = obj;
// 	let prevIt = obj;
//   if (symbols[0].isArray) {
//     it = it[symbols[0].symbol].at(symbols[0].index);
//   } else {
//     it = it[symbols[0].symbol];
//   }

//   for (let i = 1; i < len; i++) {
//     if (symbols[i].isArray) {
//       it = it.at(symbols[i].index);
//     } else {
//       it = it[symbols[i].symbol];
//     }

//     if (!it) {
//       // missing the last, so construct it.
//       if (i + 1 === len) {
//         // if prevIt is object, what if it is ARRAY?
//         console.log("Path exists");
//         prevIt[symbols[len - 1].symbol] = "xxx";
//       } else {
// 				console.log('missing path')
//         // missing from the middle
//       }
//       return false;
//     }

//     prevIt = it;
//   }

// 	return true;
// }

// const obj = {user: {name: 'Claus'}}
// jPathExists('user.surname', obj)
// console.log(obj)

// const obj = { user: { identity: { name: "Claus" } } };
// jPathExists("user.identity.surname", obj);
// console.log(obj);

// const obj =  {user: [{name: 'Claus'}]};
// jPathExists('user[0].surname', obj)
// console.log(obj);

// const obj = { user: { name: 'claus' } };
// jPathExists("user.company.vat", obj);
// console.log(obj);

// jPathExists('user.surname', {user: {name: 'Claus', surname: 'x'}})

// jPathExists('user[0].name', {user: [{name: 'Claus'}]})
// const x = jPathExists('user[2].name', {user: [{name: 'Claus'}, {name: 'Claus2'}]})

// console.log(x)

// TODO: Does not work for the second telephone. The problem is that we store telephones[0] = [...] and so when we examine the telephones[1] there are created a new array.
// TODO: We need a common array
const state = {
  "user.name": "Claus",
  "user.lastName": "Claus",
  "user.address.zipCode": 70200,
  "user.address.telephones[0].number": 123,
  // "user.address.telephones[1].number": 345,
};

// let obj = {};
// for (let key in state) {
// obj = objectBuilder(key, obj, state[key]);
// }
// console.dir(obj, { depth: null });

// let obj = objectBuilder("user.name", {}, "Claus");
// console.dir(obj, { depth: null });

// obj = objectBuilder("x.telephone[0].number", obj, "Claus");
// console.dir(obj, { depth: null });

// obj = objectBuilder("telephone[0].telephoneId", obj, 1);
// console.dir(obj, { depth: null });

module.exports = objectBuilder;
