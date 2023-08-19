const { get } = require("https");
const { writeFileSync } = require("fs");

const getData = (req) => {
  return new Promise((resolve) => {
    let obj = "";

    req.on("data", (chunk) => {
      obj += chunk.toString();
    });

    req.on("end", () => {
      resolve(obj);
    });
  });
};

get("https://www.google.com", async (req) => {
  const response = await getData(req);
  writeFileSync("google-home-page.html", response);
});
