import { TIMEOUT, send } from "./request.mjs";
import { read } from "./response.mjs";

function request(url, data) {
  send(url, data);
  return read();
}

console.log(request("www.google.com", "data"));
console.log(TIMEOUT);
