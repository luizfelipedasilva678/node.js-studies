const EventEmitter = require("events");
const process = require("process");
const celebrity = new EventEmitter();

celebrity.on("race", (result) => {
  if (result === "lost") console.log("Boo!");
  if (result === "win") console.log("Congratulations! You are the best person");
});

process.on("exit", (code) => {
  console.log("Exiting " + code);
});

celebrity.emit("race", "win");
celebrity.emit("race", "win");
