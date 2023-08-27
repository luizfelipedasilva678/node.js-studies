import http from "http";
import { Readable } from "stream";
import { randomUUID } from "node:crypto";

function* run() {
  for (let i = 0; i <= 99; i++) {
    const data = {
      id: randomUUID(),
      name: `Luiz-${i}`,
      at: Date.now(),
    };
    yield data;
  }
}

function handler(req, res) {
  /*
  const readableStream = Readable({
    read() {
      this.push("Hello");
      this.push("World");
      this.push(null);
    },
  });
    */

  const readableStream = Readable({
    read() {
      for (const data of run()) {
        this.push(JSON.stringify(data).concat("\n"));
      }

      this.push(null);
    },
  });

  readableStream.pipe(res);
}

http
  .createServer(handler)
  .listen(3000)
  .on("listening", () => console.log("listening"));
