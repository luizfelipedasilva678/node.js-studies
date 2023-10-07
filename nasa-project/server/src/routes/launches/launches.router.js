const express = require("express");
const {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
} = require("./launches.controller");

const launches = express.Router();
launches.get("/", getAllLaunches);
launches.post("/", addNewLaunch);
launches.delete("/:flightNumber", abortLaunch);
module.exports = launches;
