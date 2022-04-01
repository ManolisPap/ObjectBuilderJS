import objectBuilder from '../src/ObjectBuilder';

describe('Check Parameters', () => {
  test('Test 1', () => {
    const f = () => {
      objectBuilder('name', [], 'val');
    };

    expect(f).toThrow(Error);
    expect(f).toThrow(/need to be an object/);
  });
});

// =================================================================================

describe('Object Builder, Nesting objects', () => {
  test('Test A.1', () => {
    const obj = {
      name: 'Manolis',
    };

    const result = objectBuilder('name', {}, 'Manolis');

    expect(result).toStrictEqual(obj);
  });

  test('Test A.2', () => {
    const obj = {
      user: {
        name: 'Manolis',
      },
    };

    const result = objectBuilder('user.name', {}, 'Manolis');

    expect(result).toStrictEqual(obj);
  });

  test('Test A.3', () => {
    const obj = {
      user: {
        company: {
          companyName: 'Art Of Jewelry',
        },
      },
    };

    const result = objectBuilder('user.company.companyName', {}, 'Art Of Jewelry');

    expect(result).toStrictEqual(obj);
  });
});

// =================================================================================

describe('Object Builder, Arrays', () => {
  test('Test B.1', () => {
    const obj = {
      users: [{ name: 'Manolis' }],
    };

    const result = objectBuilder('users[0].name', {}, 'Manolis');

    expect(result).toStrictEqual(obj);
  });

  test('Test B.2', () => {
    const obj = {
      user: {
        company: {
          addresses: [{ address: 'address1' }],
        },
      },
    };

    const result = objectBuilder('user.company.addresses[0].address', {}, 'address1');

    expect(result).toStrictEqual(obj);
  });

  test('Test B.3', () => {
    const obj = {
      user: {
        company: {
          addresses: [{ telephones: [{ number: 123 }] }],
        },
      },
    };

    const result = objectBuilder('user.company.addresses[0].telephones[0].number', {}, 123);

    expect(result).toStrictEqual(obj);
  });

  test('Test B.4', () => {
    const obj = {
      numbers: [123],
    };

    const tmp = objectBuilder('numbers[0]', {}, 123);

    expect(tmp).toStrictEqual(obj);
  });

  test('Test B.5', () => {
    const obj = {
      numbers: [123, 345],
    };

    const tmp = objectBuilder('numbers[0]', {}, 123);
    objectBuilder('numbers[1]', tmp, 345);

    expect(tmp).toStrictEqual(obj);
  });

  test('Test B.6', () => {
    const obj = {
      address: {
        numbers: [123, 345],
        address: 'Kalamaki',
      },
    };

    const tmp = objectBuilder('address.numbers[0]', {}, 123);
    objectBuilder('address.numbers[1]', tmp, 345);
    objectBuilder('address.address', tmp, 'Kalamaki');

    expect(tmp).toStrictEqual(obj);
  });

  test('Test B.7', () => {
    const obj = {
      user: {
        company: {
          addresses: [{ telephones: [123, 345] }],
        },
      },
    };

    const tmp = objectBuilder('user.company.addresses[0].telephones[0]', {}, 123);
    objectBuilder('user.company.addresses[0].telephones[1]', tmp, 345);

    expect(tmp).toStrictEqual(obj);
  });
});

// =================================================================================

describe('Object Builder, Arrays and Objects', () => {
  test('Test C.1', () => {
    const obj = {
      users: [{ family: { name: 'Papadospyridaki' } }],
    };

    const result = objectBuilder('users[0].family.name', {}, 'Papadospyridaki');

    expect(result).toStrictEqual(obj);
  });

  test('Test C.2', () => {
    const obj = {
      users: [{ family: { members: [{ name: 'Manolis' }] } }],
    };

    const result = objectBuilder('users[0].family.members[0].name', {}, 'Manolis');

    expect(result).toStrictEqual(obj);
  });
});

// =================================================================================

describe('Object Builder, Nesting objects with multiple properties', () => {
  test('Test D.1', () => {
    const obj = {
      name: 'Manolis',
      surname: 'Papadospyridakis',
    };

    const tmp = objectBuilder('name', {}, 'Manolis');
    objectBuilder('surname', tmp, 'Papadospyridakis');

    expect(tmp).toStrictEqual(obj);
  });

  test('Test D.2', () => {
    const obj = {
      user: {
        name: 'Manolis',
        surname: 'Papadospyridakis',
      },
    };

    const tmp = objectBuilder('user.name', {}, 'Manolis');
    objectBuilder('user.surname', tmp, 'Papadospyridakis');

    expect(tmp).toStrictEqual(obj);
  });

  test('Test D.3', () => {
    const obj = {
      user: {
        company: {
          companyName: 'Art Of Jewelry',
          vat: 123,
        },
      },
    };

    const tmp = objectBuilder('user.company.companyName', {}, 'Art Of Jewelry');
    const result = objectBuilder('user.company.vat', tmp, 123);

    expect(result).toStrictEqual(obj);
  });
});

// =================================================================================

describe('Object Builder, Arrays with multiple elements', () => {
  test('Test E.1', () => {
    const obj = {
      users: [{ name: 'Manolis' }, { name: 'Jack' }],
    };
    const tmp = objectBuilder('users[0].name', {}, 'Manolis');
    const result = objectBuilder('users[1].name', tmp, 'Jack');
    expect(result).toStrictEqual(obj);
  });

  test('Test E.2', () => {
    const obj = {
      user: {
        company: {
          addresses: [{ address: 'address1' }, { address: 'address2' }],
        },
      },
    };
    const tmp = objectBuilder('user.company.addresses[0].address', {}, 'address1');
    objectBuilder('user.company.addresses[1].address', tmp, 'address2');
    expect(tmp).toStrictEqual(obj);
  });

  test('Test E.3', () => {
    const obj = {
      user: {
        company: {
          addresses: [{ telephones: [{ number: 123 }, { number: 345 }] }],
        },
      },
    };
    const tmp = objectBuilder('user.company.addresses[0].telephones[0].number', {}, 123);
    objectBuilder('user.company.addresses[0].telephones[1].number', tmp, 345);
    expect(tmp).toStrictEqual(obj);
  });

  test('Test E.4', () => {
    const obj = {
      user: {
        company: {
          addresses: [{ telephones: [{ numbers: [{ 1: 123 }, { 2: 345 }] }] }],
        },
      },
    };
    const tmp = objectBuilder('user.company.addresses[0].telephones[0].numbers[0].1', {}, 123);
    objectBuilder('user.company.addresses[0].telephones[0].numbers[1].2', tmp, 345);
    expect(tmp).toStrictEqual(obj);
  });

  test('Test E.5', () => {
    const obj = {
      user: {
        company: {
          addresses: [
            {
              telephones: [{ numbers: [{ 1: 123 }] }, { numbers: [{ 1: 345 }] }],
            },
          ],
        },
      },
    };
    const tmp = objectBuilder('user.company.addresses[0].telephones[0].numbers[0].1', {}, 123);
    objectBuilder('user.company.addresses[0].telephones[1].numbers[0].1', tmp, 345);
    expect(tmp).toStrictEqual(obj);
  });

  test('Test E.6', () => {
    const obj = {
      user: {
        company: {
          addresses: [
            {
              telephones: [{ numbers: [{ 1: 123 }] }],
            },
            {
              telephones: [{ numbers: [{ 1: 345 }] }],
            },
          ],
        },
      },
    };
    const tmp = objectBuilder('user.company.addresses[0].telephones[0].numbers[0].1', {}, 123);
    objectBuilder('user.company.addresses[1].telephones[0].numbers[0].1', tmp, 345);
    expect(tmp).toStrictEqual(obj);
  });

  test('Test E.7', () => {
    const obj = {
      user: {
        company: {
          addresses: [
            { address: 'address1', zipCode: 123 },
            { address: 'address2', zipCode: 345 },
          ],
        },
      },
    };
    const tmp = objectBuilder('user.company.addresses[0].address', {}, 'address1');
    objectBuilder('user.company.addresses[0].zipCode', tmp, 123);
    objectBuilder('user.company.addresses[1].address', tmp, 'address2');
    objectBuilder('user.company.addresses[1].zipCode', tmp, 345);
    expect(tmp).toStrictEqual(obj);
  });
});

// =================================================================================

describe('Object Builder, Arrays and Objects with multiple elements', () => {
  test('Test F.1', () => {
    const obj = {
      user: {
        name: 'Manolis',
        company: {
          addresses: [{ address: 'Kalamaki1' }, { address: 'Kalamaki2' }],
          vat: 123,
        },
        lastname: 'Papadospyridakis',
      },
    };

    const tmp = objectBuilder('user.name', {}, 'Manolis');
    objectBuilder('user.company.addresses[0].address', tmp, 'Kalamaki1');
    objectBuilder('user.company.addresses[1].address', tmp, 'Kalamaki2');
    objectBuilder('user.company.vat', tmp, 123);
    objectBuilder('user.lastname', tmp, 'Papadospyridakis');

    expect(tmp).toStrictEqual(obj);
  });

  test('Test F.2', () => {
    const obj = {
      user: {
        email: 'manolis123@gmail.com',
        password: '12345678',
        name: 'Manolis',
        surname: 'Papadospyridakis',
        role: 'COURIER_COMPANY',
        company: {
          companyName: 'Art Of Jewelry',
          vat: '050405368',
          isIndividual: false,
          addresses: [
            {
              address: 'Kalamaki',
              zipCode: '70200',
              city: 'Kalamaki',
              floor: 1,
              doorNumber: '1',
              telephones: [
                {
                  number: '6955546039',
                },
                {
                  number: '2892045475',
                },
              ],
            },
          ],
        },
      },
    };

    const tmp = objectBuilder('user.email', {}, 'manolis123@gmail.com');
    objectBuilder('user.password', tmp, '12345678');
    objectBuilder('user.name', tmp, 'Manolis');
    objectBuilder('user.surname', tmp, 'Papadospyridakis');
    objectBuilder('user.role', tmp, 'COURIER_COMPANY');

    objectBuilder('user.company.companyName', tmp, 'Art Of Jewelry');
    objectBuilder('user.company.vat', tmp, '050405368');
    objectBuilder('user.company.isIndividual', tmp, false);

    objectBuilder('user.company.addresses[0].address', tmp, 'Kalamaki');
    objectBuilder('user.company.addresses[0].zipCode', tmp, '70200');
    objectBuilder('user.company.addresses[0].city', tmp, 'Kalamaki');
    objectBuilder('user.company.addresses[0].floor', tmp, 1);
    objectBuilder('user.company.addresses[0].doorNumber', tmp, '1');

    objectBuilder('user.company.addresses[0].telephones[0].number', tmp, '6955546039');
    objectBuilder('user.company.addresses[0].telephones[1].number', tmp, '2892045475');

    expect(tmp).toStrictEqual(obj);
  });

  test('Test F.3', () => {
    const obj = {
      order: {
        courierCompanyId: 1,
        pickupAddressId: 1,
        pickupDateFrom: '31-03-2022',
        pickupDateTo: '01-04-2022',
        deliveryDateFrom: '02-04-2022',
        deliveryDateTo: '03-04-2022',
        recipient: {
          name: 'Kostas',
          surname: 'Papadospyridakis',
          companyName: '-',
          vat: '12341243',
          addresses: [
            {
              address: 'Leykosia',
              zipCode: '3034',
              city: 'Leykosia',
              floor: 3,
              doorNumber: '4a',
              telephones: [
                {
                  number: '6903456934',
                },
                {
                  number: '2828282828',
                },
              ],
            },
          ],
        },
        packages: [
          {
            weight: 1.5,
            height: 10,
            width: 10,
            length: 10,
            comments: 'Hi!',
          },
          {
            weight: 2,
            height: 20,
            width: 20,
            length: 20,
            comments: 'Hi2!',
          },
        ],
      },
    };

    const tmp = objectBuilder('order.courierCompanyId', {}, 1);
    objectBuilder('order.pickupAddressId', tmp, 1);
    objectBuilder('order.pickupDateFrom', tmp, '31-03-2022');
    objectBuilder('order.pickupDateTo', tmp, '01-04-2022');
    objectBuilder('order.deliveryDateFrom', tmp, '02-04-2022');
    objectBuilder('order.deliveryDateTo', tmp, '03-04-2022');
    objectBuilder('order.recipient.name', tmp, 'Kostas');
    objectBuilder('order.recipient.surname', tmp, 'Papadospyridakis');
    objectBuilder('order.recipient.companyName', tmp, '-');
    objectBuilder('order.recipient.vat', tmp, '12341243');
    objectBuilder('order.recipient.addresses[0].address', tmp, 'Leykosia');
    objectBuilder('order.recipient.addresses[0].zipCode', tmp, '3034');
    objectBuilder('order.recipient.addresses[0].city', tmp, 'Leykosia');
    objectBuilder('order.recipient.addresses[0].floor', tmp, 3);
    objectBuilder('order.recipient.addresses[0].doorNumber', tmp, '4a');
    objectBuilder('order.recipient.addresses[0].telephones[0].number', tmp, '6903456934');
    objectBuilder('order.recipient.addresses[0].telephones[1].number', tmp, '2828282828');

    objectBuilder('order.packages[0].weight', tmp, 1.5);
    objectBuilder('order.packages[0].height', tmp, 10);
    objectBuilder('order.packages[0].width', tmp, 10);
    objectBuilder('order.packages[0].length', tmp, 10);
    objectBuilder('order.packages[0].comments', tmp, 'Hi!');

    objectBuilder('order.packages[1].weight', tmp, 2);
    objectBuilder('order.packages[1].height', tmp, 20);
    objectBuilder('order.packages[1].width', tmp, 20);
    objectBuilder('order.packages[1].length', tmp, 20);
    objectBuilder('order.packages[1].comments', tmp, 'Hi2!');

    expect(tmp).toStrictEqual(obj);
  });
});

// =================================================================================
