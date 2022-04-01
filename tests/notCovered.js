let tmp = objectBuilder("addresses[0].zipCode[0]", [], 70200);
tmp = objectBuilder("addresses[0].zipCode[1]", tmp, 70201);
tmp = objectBuilder("addresses[1].zipCode[0]", tmp, 70400);
console.dir(tmp, { depth: null });

/*
[
  {
    addresses: [ { zipCode: [ 70200 ] } ]
  },
  {
    addresses: [ { zipCode: [ 70201 ] } ]
  },
  {
    addresses: [ { zipCode: [ 70400 ] } ]
  }
]
*/
