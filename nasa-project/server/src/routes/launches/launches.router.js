const express = require("express");
const { getAllLaunches, addNewLaunch } = require("./launches.controller");

const launches = express.Router();
launches.get("/", getAllLaunches);
launches.post("/", addNewLaunch);

module.exports = launches;
