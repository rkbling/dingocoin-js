const assert = require("assert");
const dingo = require("../");

describe("utils.satoshiConversion", () => {
  it("Should convert back and forth", () => {
    const x = "213897.47123";
    assert(dingo.utils.fromSatoshi(dingo.utils.toSatoshi(x)) === x);
  });
});
