const express = require("express");
const crypto = require("crypto");
const app = express();
const cluster = require("cluster");
// const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  const numCPUs = 4;

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    // crypto.pbkdf2("my_password", "my_salt", 100000, 512, "sha512", () => {
    //   res.send("Hi");
    // });
    console.log(`processId: ${process.pid}  request do work...`);
    const FIVE_SEC = 5000;
    doWork(FIVE_SEC);
    res.send(`Do work processId:${process.pid}`);
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`API sever listening on ${PORT}  processId: ${process.pid}`);
  });
}
