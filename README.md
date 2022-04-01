# Object Builder

---

This package will help you to create an object based on a string description.

Example:

```js
// Example 1
const user = objectBuilder('name', {}, 'Bob');
objectBuilder('surname', user, 'Smith');
objectBuilder('addresses[0].zipCode', user, '1234');
objectBuilder('addresses[1].zipCode', user, '5678');

// user would look like
/*
{
  name: 'Bob',
  surname: 'Smith',
  addresses: [ { zipCode: '1234' }, { zipCode: '5678' } ]
}
*/
```

**Todo's:**

So far, it works only for object as top level element.

Do not use array as top level element:

```js
let tmp = objectBuilder('addresses[0].zipCode[0]', [], 70200);
objectBuilder('addresses[0].zipCode[1]', tmp, 70201);
objectBuilder('addresses[1].zipCode[0]', tmp, 70400);
console.dir(tmp, { depth: null });

/*
Result: Is not the expected
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
```
