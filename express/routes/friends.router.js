const friendsController = require("../controllers/friends.controller");
const express = require("express");

const friendsRouter = express.Router();
friendsRouter.post("/", friendsController.createFriend);
friendsRouter.get("/", friendsController.getFriends);
friendsRouter.get("/:friendId", friendsController.getFriend);

module.exports = friendsRouter;
