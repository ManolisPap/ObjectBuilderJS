// import objectBuilder from '../object';

const objectBuilder = require("../object");

describe("Object Builder, Nesting objects", () => {
  test("Test A.1", () => {
    const obj = {
      name: "Manolis",
    };

    const result = objectBuilder("name", {}, "Manolis");

    expect(result).toStrictEqual(obj); // fail
  });

  test("Test A.2", () => {
    const obj = {
      user: {
        name: "Manolis",
      },
    };

    const result = objectBuilder("user.name", {}, "Manolis");

    expect(result).toStrictEqual(obj); // fail
  });

  test("Test A.3", () => {
    const obj = {
      user: {
        company: {
          companyName: "Art Of Jewelry",
        },
      },
    };

    const result = objectBuilder(
      "user.company.companyName",
      {},
      "Art Of Jewelry"
    );

    expect(result).toStrictEqual(obj); // fail
  });
});

// =================================================================================

describe("Object Builder, Arrays", () => {
  test("Test B.1", () => {
    const obj = {
      users: [{ name: "Manolis" }],
    };

    const result = objectBuilder("users[0].name", {}, "Manolis");

    expect(result).toStrictEqual(obj); // fail
  });

  test("Test B.2", () => {
    const obj = {
      user: {
        company: {
          addresses: [{ address: "address1" }],
        },
      },
    };

    const result = objectBuilder(
      "user.company.addresses[0].address",
      {},
      "address1"
    );

    expect(result).toStrictEqual(obj); // fail
  });

  test("Test B.3", () => {
    const obj = {
      user: {
        company: {
          addresses: [{ telephones: [{ number: 123 }] }],
        },
      },
    };

    const result = objectBuilder(
      "user.company.addresses[0].telephones[0].number",
      {},
      123
    );

    console.dir(result, { depth: null });

    expect(result).toStrictEqual(obj); // fail
  });
});

// =================================================================================

describe("Object Builder, Arrays and Objects", () => {
  test("Test C.1", () => {
    const obj = {
      users: [{ family: { name: "Papadospyridaki" } }],
    };

    const result = objectBuilder("users[0].family.name", {}, "Papadospyridaki");

    expect(result).toStrictEqual(obj); // fail
  });

  test("Test C.2", () => {
    const obj = {
      users: [{ family: { members: [{ name: "Manolis" }] } }],
    };

    const result = objectBuilder(
      "users[0].family.members[0].name",
      {},
      "Manolis"
    );

    expect(result).toStrictEqual(obj); // fail
  });
});

// =================================================================================

describe("Object Builder, Nesting objects with multiple properties", () => {
  test("Test D.1", () => {
    const obj = {
      name: "Manolis",
      surname: "Papadospyridakis",
    };

    const tmp = objectBuilder("name", {}, "Manolis");
    const result = objectBuilder("surname", tmp, "Papadospyridakis");

    expect(result).toStrictEqual(obj); // fail
  });

  test("Test D.2", () => {
    const obj = {
      user: {
        name: "Manolis",
        surname: "Papadospyridakis",
      },
    };

    const tmp = objectBuilder("user.name", {}, "Manolis");
    const result = objectBuilder("user.surname", tmp, "Papadospyridakis");

    expect(result).toStrictEqual(obj); // fail
  });

  test("Test D.3", () => {
    const obj = {
      user: {
        company: {
          companyName: "Art Of Jewelry",
          vat: 123,
        },
      },
    };

    const tmp = objectBuilder("user.company.companyName", {}, "Art Of Jewelry");
    const result = objectBuilder("user.company.vat", tmp, 123);

    expect(result).toStrictEqual(obj); // fail
  });
});

// =================================================================================

describe("Object Builder, Arrays with multiple elements", () => {
  test("Test E.1", () => {
    const obj = {
      users: [{ name: "Manolis" }, { name: "Jack" }],
    };
    const tmp = objectBuilder("users[0].name", {}, "Manolis");
    const result = objectBuilder("users[1].name", tmp, "Jack");
    expect(result).toStrictEqual(obj); // fail
  });

  test("Test E.2", () => {
    const obj = {
      user: {
        company: {
          addresses: [{ address: "address1" }, { address: "address2" }],
        },
      },
    };
    const tmp = objectBuilder(
      "user.company.addresses[0].address",
      {},
      "address1"
    );
    const result = objectBuilder(
      "user.company.addresses[1].address",
      tmp,
      "address2"
    );
    expect(result).toStrictEqual(obj); // fail
  });

  test("Test E.3", () => {
    const obj = {
      user: {
        company: {
          addresses: [{ telephones: [{ number: 123 }, { number: 345 }] }],
        },
      },
    };
    const tmp = objectBuilder(
      "user.company.addresses[0].telephones[0].number",
      {},
      123
    );
    const result = objectBuilder(
      "user.company.addresses[0].telephones[1].number",
      tmp,
      345
    );
    console.dir(result, { depth: null });
    expect(result).toStrictEqual(obj); // fail
  });

  test("Test E.4", () => {
    const obj = {
      user: {
        company: {
          addresses: [{ telephones: [{ numbers: [{ 1: 123 }, { 2: 345 }] }] }],
        },
      },
    };
    const tmp = objectBuilder(
      "user.company.addresses[0].telephones[0].numbers[0].1",
      {},
      123
    );
    const result = objectBuilder(
      "user.company.addresses[0].telephones[0].numbers[1].2",
      tmp,
      345
    );
    console.dir(result, { depth: null });
    expect(result).toStrictEqual(obj); // fail
  });

  test("Test E.5", () => {
    const obj = {
      user: {
        company: {
          addresses: [
            {
              telephones: [
                { numbers: [{ 1: 123 }] },
                { numbers: [{ 1: 345 }] },
              ],
            },
          ],
        },
      },
    };
    const tmp = objectBuilder(
      "user.company.addresses[0].telephones[0].numbers[0].1",
      {},
      123
    );
    const result = objectBuilder(
      "user.company.addresses[0].telephones[1].numbers[0].1",
      tmp,
      345
    );
    console.dir(result, { depth: null });
    expect(result).toStrictEqual(obj); // fail
  });

  test("Test E.6", () => {
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
    const tmp = objectBuilder(
      "user.company.addresses[0].telephones[0].numbers[0].1",
      {},
      123
    );
    const result = objectBuilder(
      "user.company.addresses[1].telephones[0].numbers[0].1",
      tmp,
      345
    );
    console.dir(result, { depth: null });
    expect(result).toStrictEqual(obj); // fail
  });

  test("Test E.7", () => {
    const obj = {
      user: {
        company: {
          addresses: [
            { address: "address1", zipCode: 123 },
            { address: "address2", zipCode: 345 },
          ],
        },
      },
    };
    let tmp = objectBuilder(
      "user.company.addresses[0].address",
      {},
      "address1"
    );
    tmp = objectBuilder("user.company.addresses[0].zipCode", tmp, 123);
    tmp = objectBuilder("user.company.addresses[1].address", tmp, "address2");
    const result = objectBuilder("user.company.addresses[1].zipCode", tmp, 345);
    expect(result).toStrictEqual(obj); // fail
  });
});

// =================================================================================

describe("Object Builder, Arrays and Objects with multiple elements", () => {
  test("Test F.1", () => {
    const obj = {
      user: {
        name: "Manolis",
        company: {
          addresses: [{ address: "Kalamaki1" }, { address: "Kalamaki2" }],
          vat: 123,
        },
        lastname: "Papadospyridakis",
      },
    };

    let tmp = objectBuilder("user.name", {}, "Manolis");
    tmp = objectBuilder("user.company.addresses[0].address", tmp, "Kalamaki1");
    tmp = objectBuilder("user.company.addresses[1].address", tmp, "Kalamaki2");
    tmp = objectBuilder("user.company.vat", tmp, 123);
    const result = objectBuilder("user.lastname", tmp, "Papadospyridakis");

    expect(result).toStrictEqual(obj); // fail
  });

  test("Test F.2", () => {
    const obj = {
      user: {
        email: "manolis123@gmail.com",
        password: "12345678",
        name: "Manolis",
        surname: "Papadospyridakis",
        role: "COURIER_COMPANY",
        company: {
          companyName: "Art Of Jewelry",
          vat: "050405368",
          isIndividual: false,
          addresses: [
            {
              address: "Kalamaki",
              zipCode: "70200",
              city: "Kalamaki",
              floor: 1,
              doorNumber: "1",
              telephones: [
                {
                  number: "6955546039",
                },
                {
                  number: "2892045475",
                },
              ],
            },
          ],
        },
      },
    };

    let tmp = objectBuilder("user.email", {}, "manolis123@gmail.com");
    tmp = objectBuilder("user.password", tmp, "12345678");
    tmp = objectBuilder("user.name", tmp, "Manolis");
    tmp = objectBuilder("user.surname", tmp, "Papadospyridakis");
    tmp = objectBuilder("user.role", tmp, "COURIER_COMPANY");

    tmp = objectBuilder("user.company.companyName", tmp, "Art Of Jewelry");
    tmp = objectBuilder("user.company.vat", tmp, "050405368");
    tmp = objectBuilder("user.company.isIndividual", tmp, false);

    tmp = objectBuilder("user.company.addresses[0].address", tmp, "Kalamaki");
    tmp = objectBuilder("user.company.addresses[0].zipCode", tmp, "70200");
    tmp = objectBuilder("user.company.addresses[0].city", tmp, "Kalamaki");
    tmp = objectBuilder("user.company.addresses[0].floor", tmp, 1);
    tmp = objectBuilder("user.company.addresses[0].doorNumber", tmp, "1");

    tmp = objectBuilder(
      "user.company.addresses[0].telephones[0].number",
      tmp,
      "6955546039"
    );
    const result = objectBuilder(
      "user.company.addresses[0].telephones[1].number",
      tmp,
      "2892045475"
    );

    expect(result).toStrictEqual(obj); // fail
  });
});

// =================================================================================
