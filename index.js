process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require("cluster");
// const numCPUs = require("os").cpus().length;

// Is the file being executed in master mode ?
if (cluster.isMaster) {
  // Cause index.js to be executed *again* but in child mode

  const numCPUs = 2;
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Im a child, Im going to act like a server and do noting else
  const express = require("express");
  const crypto = require("crypto");
  const app = express();

  app.get("/", (req, res) => {
    crypto.pbkdf2("my_password", "my_salt", 100000, 512, "sha512", () => {
      res.send("Hi");
    });
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`API sever listening on ${PORT} processId: ${process.pid}`);
  });
}
