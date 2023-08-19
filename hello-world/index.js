const process = require("process");

const mission = process.argv[2];

if (mission === "learn") {
  console.log("Is time to learn");
} else {
  console.log(`Is time to ${mission}`);
}
