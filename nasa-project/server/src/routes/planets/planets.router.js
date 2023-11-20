const express = require("express");
const { httpGetAllPlanets } = require("./planets.controller");

const planets = express.Router();
planets.get("/", httpGetAllPlanets);

module.exports = planets;
