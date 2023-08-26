const http = require("http");

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

const server = http.createServer((req, res) => {
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
});

server.listen(3000);
