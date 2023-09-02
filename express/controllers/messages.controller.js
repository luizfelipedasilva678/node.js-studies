const path = require("path");

function getMessages(req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "skimountain.jpg"));
  //res.send("<ul><li>Test </li></ul>");
}

function postMessages(req, res) {
  console.log("Updating message...");
}

module.exports = {
  getMessages,
  postMessages,
};
