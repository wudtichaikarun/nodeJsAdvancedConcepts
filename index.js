const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

// Is the file being executed in master mode ?
if (cluster.isMaster) {
  // Cause index.js to be executed *again* but in child mode
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Im a child, Im going to act like a server and do noting else
  const express = require("express");
  const app = express();

  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(5000);
    res.send("Hi");
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`API sever listening on ${PORT} processId: ${process.pid}`);
  });
}
