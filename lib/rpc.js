"use strict";
const request = require("request");
const fs = require("fs");
const DEFAULT_PORT = 34646;

const createProxy = (username, password, port) =>
  new Proxy(
    {},
    {
      get(_, prop) {
        return (...args) => {
          const options = {
            url: "http://localhost:" + port.toString(),
            method: "post",
            headers: { "content-type": "text/plain" },
            auth: { user: username, pass: password },
            body: JSON.stringify({
              jsonrpc: "1.0",
              method: prop.toLowerCase(),
              params: args,
            }),
          };
          return new Promise((resolve, reject) => {
            request(options, (err, _, body) => {
              if (err) {
                return reject(err);
              } else {
                const r = JSON.parse(
                  body
                    .replace(
                      /"(amount|value)":\s*(\-?)(\d+)\.((\d*?[1-9])0*),/g,
                      '"$1":"$2$3.$5",'
                    )
                    .replace(
                      /"(amount|value)":\s*(\-?)(\d+)\.0+,/g,
                      '"$1":"$2$3",'
                    )
                );
                if (r.error) {
                  reject(r.error);
                } else {
                  resolve(r.result);
                }
              }
            });
          });
        };
      },
    }
  );

module.exports = {
  fromCredentials: (username, password, port = DEFAULT_PORT) =>
    createProxy(username, password, port),
  fromCookie: (path) => {
    const [username, password] = fs.readFileSync(path, "utf-8").split(":");
    return createProxy(username, password, DEFAULT_PORT);
  },
};
