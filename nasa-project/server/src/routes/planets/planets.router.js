const express = require("express");
const { getAllPlanets } = require("./planets.controller");

const planets = express.Router();
planets.get("/planets", getAllPlanets);

module.exports = planets;
