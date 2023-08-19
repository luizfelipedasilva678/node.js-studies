const { send, TIMEOUT } = require("./request");
const { read } = require("./response");

function request(url, data) {
  send(url, data);
  return read();
}

console.log(request("www.google.com", "data"));
console.log(TIMEOUT);
