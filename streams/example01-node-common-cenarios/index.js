const process = require("process");

/*
const stdin = process.stdin.on("data", (msg) => console.log(msg));
const stdout = process.stdout.on("data", (msg) =>
  process.stdout.write(msg.toString().toUpperCase())
);
stdin.pipe(stdout);
*/

// process.stdout.write(crypto.randomBytes(1e9))
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

const http = require("http");
const { readFileSync, createReadStream } = require("fs");

http
  .createServer((req, res) => {
    //const file = readFileSync("big.file").toString();
    //res.write(file);
    //res.end();
    createReadStream("big.file").pipe(res);
  })
  .listen(3000)
  .on("listening", () => console.log("listening"));
