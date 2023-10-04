const express = require("express");
const {
  getAllLaunches,
  addNewLaunch,
  deleteLaunch,
} = require("./launches.controller");

const launches = express.Router();
launches.get("/", getAllLaunches);
launches.post("/", addNewLaunch);
launches.delete("/:flightNumber", deleteLaunch);
module.exports = launches;
