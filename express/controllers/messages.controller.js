function getMessages(req, res) {
  res.send("<ul><li>Test </li></ul>");
}

function postMessages(req, res) {
  console.log("Updating message...");
}

module.exports = {
  getMessages,
  postMessages,
};
