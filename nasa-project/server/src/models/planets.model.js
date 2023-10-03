const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const habitablePlanets = [];

const filePath = path.resolve(__dirname, "..", "..", "data", "kepler_data.csv");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (chunk) => {
        if (isHabitablePlanet(chunk)) habitablePlanets.push(chunk);
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        resolve(habitablePlanets);
      });
  });
};

module.exports = {
  loadPlanetsData,
  planets: habitablePlanets,
};
