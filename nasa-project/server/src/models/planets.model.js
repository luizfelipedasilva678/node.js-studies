const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const planets = require("./planets.mongo");
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
      .on("data", async (chunk) => {
        if (isHabitablePlanet(chunk)) {
          savePlanet(chunk);
        }
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = await getAllPlanets();
        console.log(`Habitable planets ${countPlanetsFound.length}`);
        resolve();
      });
  });
};

async function getAllPlanets() {
  return await planets.find({});
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        kepler_name: planet.kepler_name,
      },
      {
        kepler_name: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error("Could not save planet");
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
