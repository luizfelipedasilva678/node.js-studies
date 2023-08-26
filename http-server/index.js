const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/friends") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        name: "Pedro",
      })
    );
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
