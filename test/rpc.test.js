const assert = require("assert");
const os = require("os");
const dingo = require("../");

describe("rpc.getBlockchainInfo", async () => {
  const rpc = dingo.rpc.fromCookie(
    "~/.dingocoin/.cookie".replace("~", os.homedir)
  );
  it("Should return height", async () => {
    assert((await rpc.getBlockchainInfo()).blocks !== undefined);
  });
});
