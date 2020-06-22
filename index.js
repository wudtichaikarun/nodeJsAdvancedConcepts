const express = require("express");
const crypto = require("crypto");
const app = express();

app.get("/", (req, res) => {
  crypto.pbkdf2("my_password", "my_salt", 100000, 512, "sha512", () => {
    console.log("request hash");

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
