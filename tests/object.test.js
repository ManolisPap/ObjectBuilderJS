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
