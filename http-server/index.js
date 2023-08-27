const http = require("http");

const getData = (req, res) => {
  return new Promise((resolve) => {
    let obj = "";

    req.on("data", (chunk) => {
      obj += chunk.toString();
    });
    req.pipe(res);

    req.on("end", () => {
      resolve(obj);
    });
  });
};

const getLastId = (friends) => {
  let lastId = 0;

  for (const friend of friends) {
    if (friend.id > lastId) {
      lastId = friend.id;
    }
  }

  return lastId;
};

const friends = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Maria",
  },
];

const server = http.createServer(async (req, res) => {
  if (
    req.method === "POST" &&
    new RegExp(/\/friends\/?\d*/, "g").test(req.url)
  ) {
    const data = await getData(req, res);
    const lastId = getLastId(friends);
    friends.push({
      id: lastId + 1,
      ...JSON.parse(data),
    });
  }

  if (req.method === "GET") {
    if (new RegExp(/\/friends\/?\d*/, "g").test(req.url)) {
      const match = req.url.match(new RegExp(/\/friends\/\d+/, "g"));
      const id = match ? match[0].split("/")[2] : undefined;
      const responseValue = id
        ? friends.filter((friend) => friend.id === Number(id))
        : friends;

      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(responseValue));
    } else if (req.url === "/messages") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.write("<html>");
      res.write("<body>");
      res.write("<ul>");
      res.write("<li>Hello</li>");
      res.write("</ul>");
      res.write("</body>");
      res.write("</html>");
      res.end();
    } else {
      res.statusCode = 404;
      res.end();
    }
  }
});

server.listen(3000);
