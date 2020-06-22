// process.env.UV_THREADPOOL_SIZE = 1;

const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log("Request:", Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("my_password", "my_salt", 100000, 512, "sha512", () => {
    console.log("Hash:", Date.now() - start);
  });
}

doRequest();

fs.readFile("src/multitask.js", "utf8", () => {
  console.log("FS:", Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();

// Request: 927
// Hash: 1183
// FS: 1202
// Hash: 1250
// Hash: 1268
// Hash: 1272
