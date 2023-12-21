const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const helmet = require("helmet");

const PORT = 3000;
const app = express();

app.use(helmet());

app.get("/secret", (req, res) => {
  return res.send("Your personal secret is 42!");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

https
  .createServer(
    {
      cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
      key: fs.readFileSync(path.join(__dirname, "key.pem")),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
