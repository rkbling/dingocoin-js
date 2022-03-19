const Web3Utils = require("web3-utils");

function toSatoshi(x) {
  if (x === null || x === undefined || typeof x !== "string" || x === "") {
    throw new Error("Expected string input");
  }
  return (BigInt(Web3Utils.toWei(x, "gwei")) / 10n).toString();
}

function fromSatoshi(x) {
  if (x === null || x === undefined || typeof x !== "string" || x === "") {
    throw new Error("Expected string input");
  }
  return Web3Utils.fromWei((BigInt(x) * 10n).toString(), "gwei").toString();
}

module.exports = {
  toSatoshi: toSatoshi,
  fromSatoshi: fromSatoshi,
};
