const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/messages", (req, res) => {
  res.send("<ul><li>Test </li></ul>");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
