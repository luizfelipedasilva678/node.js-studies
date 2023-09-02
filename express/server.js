const express = require("express");
const app = express();
const messagesController = require("./controllers/messages.controller");
const friendsController = require("./controllers/friends.controller");
const PORT = 3000;

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.use(express.json());

app.post("/friends", friendsController.createFriend);
app.get("/friends", friendsController.getFriends);
app.get("/friends/:friendId", friendsController.getFriend);

app.get("/messages", messagesController.getMessages);
app.post("/messages", messagesController.postMessages);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
