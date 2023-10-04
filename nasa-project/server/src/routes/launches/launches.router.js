const express = require("express");
const { getAllLaunches } = require("./launches.controller");

const launches = express.Router();
launches.get("/launches", getAllLaunches);

module.exports = launches;
