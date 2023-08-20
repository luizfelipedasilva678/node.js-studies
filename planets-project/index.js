const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const results = [];
const filePath = path.resolve(__dirname, "kepler_data.csv");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

fs.createReadStream(filePath)
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (chunk) => {
    if (isHabitablePlanet(chunk)) results.push(chunk);
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(
      results.map((planet) => {
        return planet["kepler_name"];
      })
    );
    console.log("Habitable planets " + results.length);
  });
